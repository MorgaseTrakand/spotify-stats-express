import { useNavigate } from "react-router-dom";

function VerifiedHeader() {
    const navigate = useNavigate()

    function handleLogo() {
      navigate('/')
    }
    function handleSettings() {
      navigate('/settings')
    }
    function handleAccount() {
      navigate('/account')
    }
    function handleProfile() {
      navigate('/dashboard')
    }
    return (
        <header className='landing-header'>
            <h1 onClick={handleLogo} className='logo'><span className='green-text'>Spotify</span>Stats</h1>
            <div className='positioning-div'>
              <h2 onClick={handleAccount}>Account</h2>
              <h2 onClick={handleSettings}>Settings</h2>
              <div className='auth-button' onClick={handleProfile}>
                <h2>My Profile</h2>
              </div>
            </div>
        </header>
    );
  }
  
  export default VerifiedHeader;