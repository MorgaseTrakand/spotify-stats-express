import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useDataContext } from '../DataContext';

function AccountPage() {
  const navigate = useNavigate();
  const { resetContext, userData, setUserData } = useDataContext();
  const [username, setUsername] = useState(userData[1])
  const [email, setEmail] = useState(userData[0])
  const [ID, setID] = useState(userData[2])

  useEffect(() => {
    if (userData.length === 0) {
      console.log("length is 0")
      fetch('http://localhost:5000/account-data', {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          handleLogout()
        }
        return response.json();
      })
      .then(data => {
        setUserData([data.email, data.display_name, data.id])
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    }
    setUsername(userData[1])
    setEmail(userData[0])
    setID(userData[2])
  }, [userData])

  function handleLogout() {
    fetch(`http://localhost:5000/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
    localStorage.removeItem("option")
    localStorage.removeItem("savedOption")
    resetContext();
    setTimeout(() => navigate('/'), 15);
  }

  return (
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
  );
}

export default AccountPage;