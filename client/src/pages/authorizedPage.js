import '../App.css';
import './dashboard.css'
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../myContext';
import { useNavigate } from 'react-router-dom';
import { logout } from "./utils";
import ArtistCard from './artistCard';
import TrackCard from './trackCard';
import { usePagePreCheck } from './utils';


function AuthorizedPage() {
  const [artistsData, setArtistsData] = useState([]);
  const [trackData, setTrackData] = useState([]);

  const queryString = window.location.search; // Gets the query string (?param1=value1&param2=value2)
  const params = new URLSearchParams(queryString);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token)
  const limit = 500;
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


  function handleLogout() {
    logout(navigate);
  }

  function handlePrint() {
    console.log(artistsData)
  }
  
  return (
    <div>
        <button onClick={topTracks}>Get Tracks</button>
        <br />
        <button onClick={topArtists}>Get Artists</button>
        <br />        
        <button onClick={handleLogout}>Logout</button>
        <br />
        <button onClick={handlePrint}>Print</button>

        <div>
          {artistsData.map((artist, index) => (
            <ArtistCard
              key={index}
              imageSrc={artist.image[0].url} 
              artistName={artist.name}
              position={artist.position}
            />
          ))}
        </div>
        <div>
          {trackData.map((track, index) => (
            <TrackCard
              key={index}
              imageSrc={track.image[0].url}
              trackName={track.name}
              artistName={track.artist || 'Unknown'}
              position={track.position}
            />
          ))}
        </div>
    </div>
  );
}

export default AuthorizedPage;