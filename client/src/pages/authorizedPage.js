import '../App.css';
import './dashboard.css'
import React, { useState } from 'react';
import ArtistCard from './artistCard';
import TrackCard from './trackCard';
import Layout from '../components/Layout'
import Data from '../components/Data'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext';


function AuthorizedPage() {
  const { artistsData, trackData } = useDataContext();

  var username = "Morgase";
  const navigate = useNavigate();
  function handleLogo() {
    navigate('/');
  }

  return (
    <Layout>
      <Data>
        <div className='hero'>
          <div className='shadow purple'></div>
          <div className='shadow red'></div>
          <div className='shadow blue'></div>

          <div className='main-auth-container'>
            <header className='landing-header'>
              <h1 onClick={handleLogo} className='logo'><span className='green-text'>Spotify</span>Stats</h1>
              <div className='positioning-div'>
                <h2>Account</h2>
                <h2>Settings</h2>
                <div className='auth-button'>
                  <h2>My Profile</h2>
                </div>
              </div>
            </header>

            <div className='main-stats-container'>
              <div className='label-container'>
                <h1 className='username focus'>{username}</h1>
                <div className='positioning-div'>
                  <h1 className='focus'>
                    Summary
                    <div className='bottom-green-border'></div>
                  </h1>
                  <h1 className='focus'>Songs</h1>
                  <h1 className='focus'>Artists</h1>
                  <h1 className='focus'>Albums</h1>
                  <h1 className='focus'>Genres</h1>
                </div>
              </div>

              <div className='outlined-stats-container'>
                <div className='glassmorphism-test'>

                </div>

                <div className='dashboard-flexbox-container'>
                  <div className='topArtists-container'>
                    <h1>Top Artists</h1>
                    <div className='topArtists'>
                    {artistsData.map((artist, index) => (
                      <ArtistCard
                        key={index}
                        imageSrc={artist.image[0].url} 
                        artistName={artist.name}
                        position={artist.position}
                      />
                    ))}
                    </div>
                  </div>
                  <div className='topArtists-container'>
                    <h1>Top Tracks</h1>
                    <div className='topArtists'>
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
                </div>
      
              </div>
            </div>
          </div>
        </div>
      </Data>
    </Layout>
  );
}

export default AuthorizedPage;