
import { useNavigate } from "react-router-dom";

function VerifiedComponent() {
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
            <header className='landing-header'>
              <h1 className='logo'><span className='green-text'>Spotify</span>Stats</h1>
              <div onClick={handleClick} className='cta-button'>
                <h1>Profile</h1>
              </div>
            </header>
            <div className='left-container'>
              <div className='empty-spacing-div'></div>
              <div className='middle-div'>
                <h1 className='heading focus'>
                  Unlock your Detailed and Personal Spotify Stats
                </h1>
                <h2 className='focus'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet velit orci, ac imperdiet nibh tincidunt non. Aliquam ullamcorper felis maximus orci congue fermentum et eget eros. 
                </h2>
                <div onClick={handleClick} className='cta-button centered-button focus'>
                  <h1>Profile</h1>
                </div>
              </div>
              <div className='notice'>
                <h3>
                  I accept that data is gathered  in accordance to the Privacy Policy
                </h3>
              </div>
            </div>
            <div className='right-container'>
              <div className='card3D'>
                <div className='card-image-container'>
                  <img className='left-image'></img>
                  <img className='middle-image'></img>
                  <img className='right-image'></img>
                </div>
                <div className='card-body-container'>
                  <div className='card-song-label'></div>
                  <div className='card-song-label'></div>
                  <div className='card-song-label'></div>
                  <div className='card-song-label'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default VerifiedComponent;