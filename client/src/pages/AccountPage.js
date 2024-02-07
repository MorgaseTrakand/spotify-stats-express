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
    <div className='account-hero'>
      <div className='shadow blue'></div>
      <div className='shadow blue2'></div>
      <div className='shadow blue3'></div>
      <div className='shadow blue4'></div>

      <div className='main-account-container'>
        <AuthHeader />
        <div className='account-container'>
          <h1 className='focus'>Spotify Account</h1>
          <div className='account-left-margin'>
            <h2 className='focus'>Account that you logged in with</h2>
          </div>
          <h2 className='account-margin-bottom focus'><span className='light-grey'>Username:</span> 
            <br/>
            {username}
          </h2>
          <h2 className='account-margin-bottom focus'><span className='light-grey'>Email:</span> 
            <br/>
            {email}
          </h2>
          <h2 className='account-margin-bottom focus'><span className='light-grey'>Spotify ID:</span> 
            <br/>
            {ID}
          </h2>
          <button className='cta-button focus account-button' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;