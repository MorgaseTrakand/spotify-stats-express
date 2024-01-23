import '../App.css';
import './dashboard.css'
import React, { useState } from 'react';
import ArtistCard from './artistCard';
import TrackCard from './trackCard';
import Layout from '../components/Layout'
import Data from '../components/Data'
import '../App.css';
import { useNavigate } from 'react-router-dom';


function AuthorizedPage() {
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
                  <h1>Summary
                    <div className='bottom-green-border'></div>
                  </h1>
                  <h1>Songs</h1>
                  <h1>Artists</h1>
                  <h1>Albums</h1>
                  <h1>Genres</h1>
                </div>
              </div>
              <div className='outlined-stats-container'>

              </div>
            </div>
          </div>
        </div>
        {/* <div className='stat-container h-screen w-full bg-[#060F16]'>
          <div className='header'>
            <h1 className='logo'>SpotifyStats</h1>
            <div className='left-container'>
              <h1>Account</h1>
              <h1>Settings</h1>
              <h1>My Profile</h1>
            </div>
          </div>
        </div> */}
      </Data>
    </Layout>
  );
}

export default AuthorizedPage;