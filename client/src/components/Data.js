import { useEffect } from 'react';
import { useDataContext } from '../DataContext';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  const { trackData, setArtistsData, setTrackData, setGenreData, setAlbumData, setUserData, term } = useDataContext();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      hasAccessToken();
    }
    else {
      noAccessToken();
    }
  }, [term]);

  function hasAccessToken() {
    const access_token = localStorage.getItem("access_token")

    gatherData(access_token)
  }
  
  function noAccessToken() {
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem('access_token', params.get('access_token'));
    localStorage.setItem('refresh_token', params.get('refresh_token'))

    gatherData(localStorage.getItem('access_token'))
  }

  function gatherData(access_token) {
    if (trackData[0]) {
      console.log("already has set data in react context")
      return;
    }
    fetch(`http://localhost:5000/user-data?access_token=${access_token}&term=${term}`)
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
      setUserData(data.user)
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