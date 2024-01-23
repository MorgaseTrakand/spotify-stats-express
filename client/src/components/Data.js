import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

it basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const DataWrapper = ({ children }) => {
  const [artistsData, setArtistsData] = useState([]);
  const [trackData, setTrackData] = useState([]);

  const queryString = window.location.search; // Gets the query string (?param1=value1&param2=value2)
  const params = new URLSearchParams(queryString);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token)
  const limit = 10;
  const navigate = useNavigate();


  function topArtists() {
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

  function topTracks() {
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

