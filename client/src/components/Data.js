import { useEffect } from 'react';
import { useDataContext } from '../DataContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  const { setArtistsData, setTrackData, setGenreData, setAlbumData, setUserData, term, setSongPopularity, setArtistPopularity, setSongLength } = useDataContext();
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('option')
    fetch('http://localhost:5000/logout')
    navigate('/')
  }

  useEffect(() => {
    if (Cookies.get('logged_in') == 'true') {
      gatherData()
    }
    else {
      noAccessToken();
    }
  }, [term]);
  
  function noAccessToken() {
    console.log("no access")
    fetch('http://localhost:5000/refresh_token')
    .then(response => {
      if (response.ok) {
        console.log("refreshed token gathering data in data.js");
        gatherData();
      } else {
        logout();
      }
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  }

  function setData(data) {
    setTrackData(data.songs) 
    setArtistsData(data.artists) 
    setGenreData(data.genres) 
    setAlbumData(data.albums)
    setUserData(data.user)
    setSongPopularity(data.song_popularity)
    setArtistPopularity(data.artist_popularity)
    setSongLength(data.song_length)
  }


  function gatherData() {
    fetch(`http://localhost:5000/user-data?term=${term}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setData(data)
      console.log("updating data")

      const spinner = document.querySelector(".lds-ring");
      const outlinedContainer = document.querySelector(".outlined-stats-container");
      spinner.classList.add("display-none");
      outlinedContainer.classList.remove("add-blur");
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  return (
    <div>
      { children }
    </div>
  );
}

export default DataWrapper;