const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios');
const querystring = require('querystring');
const db = require('./db'); 
const dotenv = require('dotenv').config();
const { calculateGenres, calculateAlbums, calculateSongStats, calculateArtistStats } = require('./userDataUtils');

var app = express();

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
//more middleware setup
app.use(cookieParser());
app.use(bodyParser.json());

//cors options
const corsOptions = {
    origin: "http://localhost:3000",
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

//helper function to get user data
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
    return {"email": email, "display_name": display_name, "id": id }
    
  } catch (error) {
    console.error("Error gathering userData:");
  }
} 

app.get('/test', async (req, res) => {
  const access_token = 'BQAGfZXHhf5eWeeJ_4r6LgEGLzyIk2WwOsT-XYFewOEEGniTx7f10nnpBvJY9hsPKGGtAzpnrC7Y08JH9RJ12dm8lwxjWEqCWZ5jcp5VMzswNaMfGJYiGyuPKhDHorDXbE1Zpi_88JImw9NvgeyHm2G0Ap87OqPSrRc5IkrCrgj7ZYemGrTjlAqSL3M9fCFFgLKp9cUGM5gf8x7iSNG9W7n35y_O5XWZjQ'
  const data = await gatherUserData(access_token)
  res.send(data)
})

//helper function to handle database checking and population
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

//login route, sets up csrf protection, returns auth url to frontend
app.get('/login', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken);
  const authorizeUrl = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private user-read-email user-top-read user-read-recently-played&state=${csrfToken}`;
  res.json({ authUrl: authorizeUrl });
});


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
      redirect_url = 'http://localhost:3000/dashboard'
      res.cookie('access_token', access_token, { maxAge: 3600000, httpOnly: true, secure: false });
      res.cookie('refresh_token', refresh_token, { maxAge: 84400000, httpOnly: true, secure: false });
      res.cookie('logged_in', 'true', { maxAge: 3600000, secure: false })
      res.redirect(redirect_url);
  }
  catch (error) {
    console.log("error during callback" + error)
  }
});

app.get('/account-data', csrfProtection, async (req, res) => {
  try {
    var access_token = req.cookies['access_token']
    const refresh_token = req.cookies['refresh_token']
    if (access_token == undefined) {
      access_token = await refreshToken(refresh_token)
      res.cookie('access_token', access_token, { maxAge: 3600000, httpOnly: true, secure: false });
    } 
    const userData = await gatherUserData(access_token)
    res.json(userData)
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/user-data', csrfProtection, async (req, res) => {
  try {
    const term = req.query.term;
    var access_token = req.cookies['access_token'];
    const refresh_token = req.cookies['refresh_token']
    if (access_token == undefined) {
      access_token = await refreshToken(refresh_token)
      res.cookie('access_token', access_token, { maxAge: 3600000, httpOnly: true, secure: false });
    }
    const data = {
      user: [], songs: [], artists: [], albums: [], genres: [],
      song_popularity: { Popular: 0, Average: 0, Obscure: 0 },
      song_length: { Short: 0, Average: 0, Long: 0 },
      artist_popularity: { Popular: 0, Average: 0, Obscure: 0 },
    };

    //fetch user data
    const userData = await gatherUserData(access_token)
    data.user = [email=userData.email, display_name=userData.display_name, id=userData.id]

    // Fetch top 50 songs
    await axios.get('https://api.spotify.com/v1/me/top/tracks?&limit=50&time_range='+term, {
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
          popularity: track.popularity,
          albums: {
            album_type: track.album.album_type,
            artists: track.album.artists.map(artist => ({
              name: artist.name,
              uri: artist.uri
            })),
            external_urls: track.album.external_urls,
            images: track.album.images,
            name: track.album.name,
            release_date: track.album.release_date,
            uri: track.album.uri
          },
          length: track.duration_ms/1000
        }));
        data.songs = topTracks;
      });
    // Fetch top 50 artists
    await axios.get('https://api.spotify.com/v1/me/top/artists?&limit=50&time_range='+term, {
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

    // Calculate top genres here
    data.genres = calculateGenres(data)
    // Calculate top albums here
    data.albums = calculateAlbums(data);
    // Calculate additional stats for songs here
    calculateSongStats(data)
    //additional stats for artists
    calculateArtistStats(data)

    // Send the response
    res.json(data);
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).send("Internal Server Error // access_token invalid");
  }
});


const refreshToken = async (refreshToken) => {
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
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
  }
}

//clears the cookies then sends a response to stop web hangups
app.get('/logout', (req, res) => {
  res.clearCookie('logged_in');
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.end();
});

app.listen(5000);