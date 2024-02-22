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
    //sets the option to populate in dashboard if user logs in
    //simply handles the initial text
    if (localStorage.getItem('option') == undefined) {
      localStorage.setItem('option', 'All Time')
    }
    //allows reloading of page to save which option you selected
    if (localStorage.getItem('savedOption') == undefined) {
      localStorage.setItem('savedOption', 'long_term')
    }
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