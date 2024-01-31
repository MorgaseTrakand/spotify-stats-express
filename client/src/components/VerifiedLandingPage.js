
import { useNavigate } from "react-router-dom";
import VerifiedHeader from "./VerifiedHeader";
import { useEffect } from "react";

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
            <VerifiedHeader />
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
                  <h1>My Profile</h1>
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
                <div className="shadow blue"></div>
                  <div className='topArtists'>
                    <div className='landing-image-carosel'>
                      <img className='landing-second-image' src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe'></img>
                      <img className='landing-first-image' src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe'></img>
                      <img className='landing-second-image' src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe'></img>
                    </div>
                    <div className="landing-track-card">
                      <p>1</p>
                      <div className='track-card-container'>
                        <img src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe' />
                        <div className='track-card-name-container'>
                          <h2>With or Without You</h2>
                          <h3>U2</h3>
                        </div>
                      </div>
                    </div>
                    <div className="landing-track-card">
                      <p>2</p>
                      <div className='track-card-container'>
                        <img src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe' />
                        <div className='track-card-name-container'>
                          <h2>With or Without You</h2>
                          <h3>U2</h3>
                        </div>
                      </div>
                    </div>
                    <div className="landing-track-card">
                      <p>3</p>
                      <div className='track-card-container'>
                        <img src='https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe' />
                        <div className='track-card-name-container'>
                          <h2>With or Without You</h2>
                          <h3>U2</h3>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default VerifiedComponent;