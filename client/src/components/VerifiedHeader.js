import { useNavigate } from "react-router-dom";

function VerifiedHeader() {
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
        <header className='landing-header'>
            <h1 onClick={handleLogo} className='logo focus'><span className='green-text'>Spotify</span>Stats</h1>
            <div className='positioning-div focus'>
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
                <div class='menu-button'></div>
              </label>
              <ul class="menu">
                <li>
                  <h2 onClick={handleAccount}>Account</h2>
                </li>
                <li>
                  <div className='auth-button' onClick={handleProfile}>
                    <h2>Profile</h2>
                  </div>
                </li>
              </ul>
            </div>
        </header>
    );
  }
  
  export default VerifiedHeader;
