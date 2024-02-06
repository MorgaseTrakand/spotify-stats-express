import { useNavigate } from "react-router-dom";

function AuthHeader() {
    const navigate = useNavigate()

    function handleLogo() {
      navigate('/')
    }
    function handleAccount() {
      navigate('/account')
    }
    function handleProfile() {
      navigate('/dashboard')
    }
    return (
        <header className='auth-header'>
            <h1 onClick={handleLogo} className='logo'><span className='green-text'>Spotify</span>Stats</h1>
            <div className='positioning-div'>
              <h2 onClick={handleAccount}>Account</h2>
              <div className='auth-button' onClick={handleProfile}>
                <h2>Profile</h2>
              </div>
            </div>
        </header>
    );
  }
  
  export default AuthHeader;