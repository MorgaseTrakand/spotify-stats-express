import { useNavigate } from "react-router-dom";

function VerifiedHeader() {
    const navigate = useNavigate()

    function handleLogo() {
      navigate('/')
    }
    function handleSettings() {
      navigate('/settings')
    }
    return (
        <header className='landing-header'>
            <h1 onClick={handleLogo} className='logo'><span className='green-text'>Spotify</span>Stats</h1>
            <div className='positioning-div'>
              <h2>Account</h2>
              <h2 onClick={handleSettings}>Settings</h2>
              <div className='auth-button'>
                <h2>My Profile</h2>
              </div>
            </div>
        </header>
    );
  }
  
  export default VerifiedHeader;