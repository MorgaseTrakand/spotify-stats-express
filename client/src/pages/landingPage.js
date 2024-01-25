import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import VerifiedComponent from '../components/VerifiedLandingPage';
import UnverifiedComponent from '../components/UnverifiedLandingPage';



function LandingPage() {
  const [verified, setVerified] = useState(false);

  async function validate(access_token) {
    try {
      console.log("entering validate function on landing page");
      console.log("validate checking " + access_token);
  
      const response = await fetch(`http://localhost:5000/token_valid?access_token=${access_token}`);
      const data = await response.json();
      const trueOrFalse = data.valid;
  
      if (trueOrFalse) {
        console.log("token validated");
        return true;
      } 
      console.log("token failed validation")
      return false;
    } catch (error) {
      console.error('Error checking validity:', error);
      return false;
    }
  }

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      console.log("access token exists, checking validity")
      validate(access_token)
      .then(result => {
        if (result) {
          setVerified(true)
        }
      })
    }
  }, []);


  return (
    <div>
      {verified ? (
        <VerifiedComponent />
      ) : (
        <UnverifiedComponent />
      )}
    </div>
  );
}

export default LandingPage;