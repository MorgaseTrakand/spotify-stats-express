function VerifiedHeader({ handleLogo, handleAccount, handleSettings}) {
    return (
        <header className='landing-header'>
            <h1 onClick={handleLogo} className='logo'><span className='green-text'>Spotify</span>Stats</h1>
            <div className='positioning-div'>
              <h2 onClick={handleAccount}>Account</h2>
              <h2 onClick={handleSettings}>Settings</h2>
              <div className='auth-button'>
                <h2>My Profile</h2>
              </div>
            </div>
        </header>
    );
  }
  
  export default VerifiedHeader;