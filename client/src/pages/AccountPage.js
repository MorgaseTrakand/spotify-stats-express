import '../App.css';
import React, { useState, useEffect } from 'react';
import VerifiedHeader from '../components/VerifiedHeader';


function AccountPage() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    
  }, []);

  return (
    <div className='hero'>
      <div className='shadow blue'></div>
      <div className='main-auth-container'>
        <VerifiedHeader/>
        <div className='account-container'>
          <h1>Spotify Account</h1>
          <h2>Username: {username}</h2>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;