import { useEffect, useState } from 'react';
import '../App.css';
import VerifiedComponent from '../components/VerifiedLandingPage';
import UnverifiedComponent from '../components/UnverifiedLandingPage';
import { useDataContext } from '../DataContext';
import Cookies from 'js-cookie';



function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookieValue, setCookieValue] = useState(Cookies.get('logged_in'));

  setInterval(() => setCookieValue(Cookies.get('logged_in')), 1000);

  useEffect(() => {
    if (cookieValue == 'true') {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
    }
  }, [cookieValue])

  return (
    <div>
      {loggedIn ? (
        <VerifiedComponent />
      ) : (
        <UnverifiedComponent />
      )}
    </div>
  );
}

export default LandingPage;