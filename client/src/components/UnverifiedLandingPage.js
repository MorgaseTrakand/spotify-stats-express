import { useNavigate } from "react-router-dom";
import UnverifiedHeader from "./UnverifiedHeader";

function UnverifiedComponent() {
    const navigate = useNavigate();
  
    async function handleClick() {
      if (localStorage.getItem("access_token")) {
        console.log("access_token found redirecting to dashboard")
        navigate('/dashboard')
      }
      else {
        fetch('http://localhost:5000/login')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          window.location.href = data.authUrl;
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
      }
    }
  
    return (
  <section>
        <div className='hero overflow'>
          <div className='purple shadow'></div>
          <div className='blue shadow'></div>
          <div className='red shadow'></div>
  
          <div className='main-landing-container'>
            <UnverifiedHeader handleClick={handleClick}/>
            <div className='left-container'>
              <div className='empty-spacing-div'></div>
              <div className='middle-div'>
                <h1 className='heading focus'>
                  Unlock your Detailed and Personal Spotify Stats
                </h1>
                <h2 className='focus'>
                  Beyond Wrapped: Our Platform Allows You To Experience Your Spotify Journey with Continuous, In-Depth Statistics.
                </h2>
                <div onClick={handleClick} className='cta-button centered-button focus'>
                  <h1>Sign in with Spotify</h1>
                </div>
              </div>
              <div className='notice'>
                <h3>
                  I acknowledge that data will be collected in accordance with the Privacy Policy.
                </h3>
              </div>
            </div>
            <div className='right-container'>
              <div className='card3D'>
                <img className='focus' src="/3DCard.png"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default UnverifiedComponent;