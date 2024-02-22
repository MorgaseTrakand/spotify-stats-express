import { useEffect, useState } from 'react';
import { useDataContext } from '../DataContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  const { setArtistsData, setTrackData, setGenreData, setAlbumData, setUserData, term, setSongPopularity, setArtistPopularity, setSongLength } = useDataContext();
  const navigate = useNavigate()
  const [savedTerm, setSavedTerm] = useState(localStorage.getItem('savedOption'))

  function logout() {
    localStorage.removeItem('option')
    localStorage.removeItem('savedOption')
    fetch('http://localhost:5000/logout')
    .catch(error => {
      console.error('Fetch error:', error);
    });
    navigate('/')
  }

  useEffect(() => {
    setSavedTerm(localStorage.getItem('savedOption'))
    console.log(savedTerm)
    gatherData()
  }, [term]);
  
  function setData(data) {
    console.log(data)
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
    fetch(`http://localhost:5000/user-data?term=${savedTerm}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        logout()
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