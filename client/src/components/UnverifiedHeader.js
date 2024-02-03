function UnverifiedHeader({ handleClick }) {

    return (
    <header className='landing-header'>
        <h1 className='logo'><span className='green-text'>Spotify</span>Stats</h1>
        <div onClick={handleClick} className='cta-button'>
            <h1>Sign in with Spotify</h1>
        </div>
    </header>
    );
  }
  
  export default UnverifiedHeader;