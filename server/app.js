const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios');
const querystring = require('querystring');
const db = require('./db'); 
const dotenv = require('dotenv').config();


var app = express();
const port = 5000;

// setup route middlewares
var csrfProtection = csrf({ cookie: true })

app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions = {
    origin: "https://localhost:5000",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(csrfProtection);

//Spotify API credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;
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
const gatherUserData = async (access_token) => {
  const me_url = 'https://api.spotify.com/v1/me';
  try {
    const response = await axios.get(me_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const email = response.data.email;
    const display_name = response.data.display_name;
    const id = response.data.id;

    return {"email": email, "display_name": display_name, "id": id}

  } catch (error) {
    console.error("Error gathering userData:", error);
  }
} 

const handleDBCheckingAndPopulation = async (email, display_name, id) => {
  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return;
    }
    await db.query('INSERT INTO users (email, display_name, id) VALUES (?, ?, ?)', [email, display_name, id]);
  } 
  catch (error) {
    console.log("Error checking db or populating db" + error)
  }
};

app.get('/callback', csrfProtection, async (req, res) => {
  try {
    const code = req.query.code;
    const requestData = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    };
    
    const response = await axios.post(
        SPOTIFY_TOKEN_URL,
        querystring.stringify(requestData), // Convert data to x-www-form-urlencoded format
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
          },
        }
      )
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const userData = await gatherUserData(access_token)
      await handleDBCheckingAndPopulation(email=userData.email, display_name=userData.display_name, id=userData.id)
      redirect_url = 'https://spotify-stats-express-client.onrender.com/dashboard?access_token='+access_token+"&refresh_token="+refresh_token
      res.redirect(redirect_url);
  }
  catch (error) {
    console.log("error during callback" + error)
  }
});

app.get('/account-data', csrfProtection, async (req, res) => {
  try {
    const access_token = req.query.access_token;

    const userData = await gatherUserData(access_token)
    res.json(userData)
  } catch (error) {
    console.log(error)
  }
})

app.get('/user-data', csrfProtection, async (req, res) => {
  try {
    const access_token = req.query.access_token;
    const term = req.query.term;

    const limit = 50;
    const data = {
      currentTerm: "",
      user: [],
      songs: [],
      artists: [],
      albums: [],
      genres: [],
      song_popularity: {
        Popular: 0,
        Average: 0,
        Obscure: 0
      },
      song_length: {
        Short: 0,
        Average: 0,
        Long: 0
      },
      artist_popularity: {
        Popular: 0,
        Average: 0,
        Obscure: 0
      },
    };
    data.term = term;

    //fetch user data
    const userData = await gatherUserData(access_token)
    data.user = [email=userData.email, display_name=userData.display_name, id=userData.id]

    // Fetch top 50 songs
    await axios.get('https://api.spotify.com/v1/me/top/tracks?&limit='+limit+"&time_range="+term, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(response => {
        const topTracks = response.data.items.map((track, index) => ({
          position: index + 1,
          name: track.name,
          artist: track.artists.map(artist => artist.name),
          image: track.album.images,
          id: track.id,
          genres: track.genres,
          popularity: track.popularity,
          albums: track.album,
          length: track.duration_ms/1000
        }));
        data.songs = topTracks;
      });

    // Fetch top 50 artists
    await axios.get('https://api.spotify.com/v1/me/top/artists?&limit='+limit+"&time_range="+term, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(response => {
        const topArtists = response.data.items.map((artist, index) => ({
          position: index + 1,
          name: artist.name,
          image: artist.images,
          id: artist.id,
          genres: artist.genres,
          popularity: artist.popularity
        }));
        data.artists = topArtists;
      });

    // Calculate genres here
    const genreCounts = {};
    data.artists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const genreArray = Object.entries(genreCounts);
    const sortedGenreArray = genreArray.sort((a, b) => b[1] - a[1]);

    const capitalizedGenreArray = sortedGenreArray.map(([genre, count]) => {
      const words = genre.split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedGenre = capitalizedWords.join(' ');
      return [capitalizedGenre, count];
    });

    data.genres = capitalizedGenreArray;

    // Calculate top albums here
    const albumCounts = {};
    data.songs.forEach(song => {
      if (song.albums.album_type == "ALBUM") {
        var tempArray = [song.albums.name, song.albums.images[0].url, song.albums.artists[0].name]
        albumCounts[tempArray] = (albumCounts[tempArray] || 0) + 1;
      }
    })

    const albumArray = Object.entries(albumCounts); 
    const sortedAlbumArray = albumArray.sort((a, b) => b[1] - a[1]);

    sortedAlbumArray.forEach((album, index) => {
      const parts = album[0].split(',');
      sortedAlbumArray[index] = parts;
    })

    data.albums = sortedAlbumArray;


    //additional stats for songs
    data.songs.forEach((song) => {
      const length = song.length / 60
      const tempPopularity = song.popularity
      if (length < 2.5) {
        currentValue = data.song_length["Short"]
        data.song_length["Short"] = currentValue + 1
      }
      else if (length < 4) {
        currentValue = data.song_length["Average"]
        data.song_length["Average"] = currentValue + 1
      }
      else {
        currentValue = data.song_length["Long"]
        data.song_length["Long"] = currentValue + 1
      }
      if (tempPopularity < 40) {
        currentValue = data.song_popularity["Obscure"]
        data.song_popularity["Obscure"] = currentValue + 1
      }
      else if (tempPopularity < 75) {
        currentValue = data.song_popularity["Average"]
        data.song_popularity["Average"] = currentValue + 1
      }
      else {
        currentValue = data.song_popularity["Popular"]
        data.song_popularity["Popular"] = currentValue + 1
      }
    })
    console.log(data.song_length)


    //additional stats for artists
    data.artists.forEach((artist) => {
      const tempPopularity = artist.popularity
      if (tempPopularity < 40) {
        currentValue = data.artist_popularity["Obscure"]
        data.artist_popularity["Obscure"] = currentValue + 1
      }
      else if (tempPopularity < 75) {
        currentValue = data.artist_popularity["Average"]
        data.artist_popularity["Average"] = currentValue + 1
      }
      else {
        currentValue = data.artist_popularity["Popular"]
        data.artist_popularity["Popular"] = currentValue + 1
      }
    })

    
    // Send the response
    res.json(data);
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).send("Internal Server Error // access_token invalid");
  }
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
    // console.error("Error in Axios request:", error);

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