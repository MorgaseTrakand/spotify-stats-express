import { useEffect, useCallback, useState } from 'react';
import { useDataContext } from '../DataContext';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  const { trackData, setArtistsData, setTrackData, setGenreData, setAlbumData } = useDataContext();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      hasAccessToken();
    }
    else {
      noAccessToken();
    }
  }, []);

  function hasAccessToken() {
    const access_token = localStorage.getItem("access_token")

    genreTest(access_token)
  }
  
  function noAccessToken() {
    const queryString = window.location.search; 
    const params = new URLSearchParams(queryString);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token)
    const username = params.get('username');
    localStorage.setItem('username', username)

    genreTest(access_token)
  }

  function genreTest(access_token) {
    if (trackData[0]) {
      console.log("already has set data in react context")
      return;
    }
    fetch(`http://localhost:5000/user-data?access_token=${access_token}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTrackData(data.songs) 
      setArtistsData(data.artists) 
      setGenreData(data.genres) 
      setAlbumData(data.albums)
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