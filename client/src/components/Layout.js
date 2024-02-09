import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext';

/* This function will serve as a higher-order component (HOC) that will wrap around every page on this application. 

It will serve to handle all verification and token refreshs, 
in addition to rerouting to the landing page to log in if an access token is not available or if the refresh fails.
Logic as follows, check if access token exists => if so validate token => if token validates allow page to continue as normal
if token does not validate => refresh token => if refresh fails reroute to landing page
if token does not exist => logout => reroute to landing page
*/ 
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { validationHandler, resetContext} = useDataContext();

  async function handleFailedRefresh() {
    console.log("handled failed refresh, refresh failed")
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

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("option");
    resetContext();
    navigate('/');
  }, [navigate]);


  const refreshToken = useCallback(async (refresh_token) => {
    try {
      const response = await fetch(`http://localhost:5000/refresh_token?refresh_token=${refresh_token}`);
      const responseData = await response.json();

      if (responseData.status !== 200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("option")
        handleFailedRefresh();
      }
      else {
        localStorage.setItem('access_token', responseData.access_token);
        console.log("successfully refreshed token")
      }
    } catch (error) {
      console.log(error)
      logout();
    }  }, [logout]);


  const validate = useCallback(async (access_token) => {
    try {
      const response = await fetch(`http://localhost:5000/token_valid?access_token=${access_token}`);
      const data = await response.json();
      const trueOrFalse = data.valid;

      if (trueOrFalse) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking validity:', error);
      return false;
    }  
  }, [refreshToken, navigate]);
  const { trackData } = useDataContext();

  const handleValidation = async () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      if (await validate(access_token)) {
      } else {
        await refreshToken(refresh_token);
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (trackData[0]) {
      return;
    }
    else {
      handleValidation();
    }
  }, [logout, refreshToken, validate]);

  useEffect(() => {
    handleValidation();
  }, [validationHandler])


  return (
    <div>
      { children }
    </div>
  );
}

export default Layout;

