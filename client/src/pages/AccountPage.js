import '../App.css';
import React, { useState, useEffect } from 'react';
import VerifiedHeader from '../components/VerifiedHeader';
import { useNavigate } from 'react-router-dom';


function AccountPage() {
  const navigate = useNavigate();
  const username = "null";

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate('/')
  }


  return (
    <div className='hero'>
      <div className='shadow blue'></div>
      <div className='main-auth-container'>
        <VerifiedHeader/>
        <div className='account-container'>
          <h1>Spotify Account</h1>
          <h2>Username: {username}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;