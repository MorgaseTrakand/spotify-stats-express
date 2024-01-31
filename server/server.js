const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios');
const querystring = require('querystring');
const { access } = require('fs')
const db = require('./db'); 


var app = express();
const port = 5000;

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(csrfProtection);

//Spotify API credentials
const CLIENT_ID = "eabd68e3d6d94d698c4f91470c3f9c37";
const CLIENT_SECRET = "03b3cdcd63874050b86f321620586d27";
const REDIRECT_URI = "http://localhost:5000/callback";
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

//login route
app.get('/login', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    authorize_url = (
        SPOTIFY_AUTH_URL+"?client_id="+CLIENT_ID
        +"&response_type=code&redirect_uri="+REDIRECT_URI
        +"&scope=user-read-private user-read-email user-top-read user-read-recently-played&state="+csrfToken
    )
    res.json( {"authUrl": authorize_url} )
})

app.get('/callback', csrfProtection, async (req, res) => {
    const code = req.query.code;
    const requestData = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    };
    
    await axios.post(
        SPOTIFY_TOKEN_URL,
        querystring.stringify(requestData), // Convert data to x-www-form-urlencoded format
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
          },
        }
      )
    .then(response => {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        redirect_url = 'http://localhost:3000/dashboard?access_token='+access_token+"&refresh_token="+refresh_token
        res.redirect(redirect_url);
     })
    .catch(error => {
        console.error("Error in Axios request:", error);
        res.status(500).send("Internal Server Error");
    });
})

app.get('/daily-db-update', csrfProtection, async (req, res) => {
  const access_token = req.query.access_token;
  const limit = 100;
  const data = {
    songs: [],
    artists: [],
    albums: [],
    genres: [],
    song_popularity: [],
    artist_popularity: []
  };

  //get top 50 songs
  await axios.get('https://api.spotify.com/v1/me/top/tracks?&limit='+limit, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      console.log(response)
      const topTracks = response.data.items.map((track, index) => ({
        position: index + 1,
        name: track.name,
        artist: track.artists[0].name,
        image: track.album.images,
        id: track.id,
        genres: track.genres,
        popularity: track.popularity
      }));
      console.log(topTracks)
      //res.json(topTracks);
      data.songs = topTracks;
    })
    .catch(error => {
      console.error("Error in Axios request:", error);
      res.status(500).send("Internal Server Error");
    })
    //calculate top popularity
    //time period
    //length

  //get top 50 artists
  await axios.get('https://api.spotify.com/v1/me/top/artists?&limit='+limit, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  .then(response => {
    console.log(response.data)
    const topArtists = response.data.items.map((artist, index) => ({
      position: index + 1,
      name: artist.name,
      image: artist.images,
      id: artist.id,
      genres: artist.genres
    }));
    //res.json(topArtists);
    data.artists = topArtists;
  })
  .catch(error => {
    console.error("Error in Axios request:", error);
    res.status(500).send("Internal Server Error");
  })
  res.json(data)
    //popularity

  //calculate genres here

  //calculate top albums here


})
app.get('/top-tracks', csrfProtection, async (req, res) => {
    const access_token = req.query.access_token;
    const limit = req.query.limit;

    // Get user's top tracks from Spotify API
    await axios.get('https://api.spotify.com/v1/me/top/tracks?&limit='+limit, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      console.log(response.data)
      const topTracks = response.data.items.map((track, index) => ({
        position: index + 1,
        name: track.name,
        artist: track.artists,
        image: track.album.images,
        id: track.id,
        duration: track.duration_ms,
        popularity: track.popularity
      }));
      res.json(topTracks);
    })
    .catch(error => {
      console.error("Error in Axios request:", error);
      res.status(500).send("Internal Server Error");
    })
});


app.get('/top-artists', csrfProtection, async (req, res) => {
  const access_token = req.query.access_token;
  const limit = req.query.limit;

  // Get user's top tracks from Spotify API
  await axios.get('https://api.spotify.com/v1/me/top/artists?&limit='+limit, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  .then(response => {
    console.log(response.data)
    const topArtists = response.data.items.map((artist, index) => ({
      position: index + 1,
      name: artist.name,
      image: artist.images,
      id: artist.id,
      genres: artist.genres
    }));
    res.json(topArtists);
  })
  .catch(error => {
    console.error("Error in Axios request:", error);
    res.status(500).send("Internal Server Error");
  })
});


app.get('/token_valid', csrfProtection, async (req, res) => {
  const me_url = 'https://api.spotify.com/v1/me';
  const access_token = req.query.access_token;
  let isValid = false;

  try {
    const response = await axios.get(me_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if (response.status === 200) {
      isValid = true;
      res.json( {"valid": isValid} );
    }
  } catch (error) {
    console.error("Error in Axios request:", error);

    // Check if the error is due to an invalid access token
    if (error.response && error.response.status === 401) {
      res.json( {"valid": isValid} ); // Access token is invalid
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});


app.get('/refresh_token', async (req, res) => {
  const refreshToken = req.query.refresh_token;
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    
    const accessToken = response.data.access_token;
    res.json([ { access_token: accessToken } ]);
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port)