import { useEffect, useCallback, useState } from 'react';
import { useDataContext } from '../DataContext';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

it basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  // const [artistsData, setArtistsData] = useState([]);
  // const [trackData, setTrackData] = useState([]);
  const { setArtistsData, setTrackData } = useDataContext();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      hasAccessToken();
    }
    else {
      noAccessToken();
    }
  }, []);


  function hasAccessToken() {
    console.log("has access token in data.js")
    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")

    topArtists(access_token, 10)
    topTracks(access_token, 10)
  }
  
  function noAccessToken() {
    const queryString = window.location.search; // Gets the query string (?param1=value1&param2=value2)
    const params = new URLSearchParams(queryString);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token)
    const test = localStorage.getItem("access_token")
    console.log("(In data.js) test: " + test)

    topArtists(access_token, 10);
    topTracks(access_token, 10); 
  }

  function topArtists(access_token, limit) {
    fetch(`http://localhost:5000/top-artists?access_token=${access_token}&limit=${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);      
      setArtistsData(data)  
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  function topTracks(access_token, limit) {
    fetch(`http://localhost:5000/top-tracks?access_token=${access_token}&limit=${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)     
      setTrackData(data)   
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

