import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useDataContext } from '../DataContext';


function AccountPage() {
  const navigate = useNavigate();
  const { userData } = useDataContext();

  const username = userData[1]
  const email = userData[0]
  const ID = userData[2];

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
          <h1 className='focus'>Spotify Account</h1>
          <h2 className='focus'>Username: {username}</h2>
          <h2 className='focus'>Email: {email}</h2>
          <h2 className='focus'>Spotify ID: {ID}</h2>
        </div>
        <div className='account-container no-margin'>
          <button className='focus' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;