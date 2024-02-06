import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';


function AccountPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate('/')
  }

  return (
    <div className='hero'>
      <div className='shadow blue'></div>
      <div className='main-account-container'>
        <AuthHeader />
        <div className='account-container'>
          <h1>Spotify Account</h1>
          <h2>Username: {username}</h2>
        </div>
        <div className='account-container'>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;