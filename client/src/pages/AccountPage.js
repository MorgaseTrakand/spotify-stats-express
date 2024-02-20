import '../App.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useDataContext } from '../DataContext';
import AccountWrapper from '../components/AccountData';

function AccountPage() {
  const navigate = useNavigate();
  const { resetContext, userData } = useDataContext();

  const username = userData.display_name
  const email = userData.email
  const ID = userData.id

  function handleLogout() {
    fetch(`http://localhost:5000/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(
    )
    .catch(error => {
      console.error('Fetch error:', error);
    });
    localStorage.removeItem("option")
    resetContext();
    setTimeout(() => navigate('/'), 15);
  }

  return (
    <AccountWrapper>
      <div className='account-hero'>
        <div className='shadoww blue'></div>
        <div className='shadoww blue2'></div>
        <div className='shadoww blue3'></div>
        <div className='shadoww blue4'></div>

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
    </AccountWrapper>
  );
}

export default AccountPage;