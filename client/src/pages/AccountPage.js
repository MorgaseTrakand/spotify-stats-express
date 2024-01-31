import '../App.css';
import React, { useState, useEffect } from 'react';
import VerifiedHeader from '../components/VerifiedHeader';


function AccountPage() {

  return (
    <div className='hero'>
      <div className='shadow blue'></div>

      <div className='main-auth-container'>
      <VerifiedHeader/>


      </div>
    </div>
  );
}

export default AccountPage;