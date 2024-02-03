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

  async function handleFailedRefresh() {
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
    navigate('/');
  }, [navigate]);


  const refreshToken = useCallback(async (refresh_token) => {
    console.log("refresh token:" + refresh_token)

    try {
      const response = await fetch(`http://localhost:5000/refresh_token?refresh_token=${refresh_token}`);
      if (!response.ok) {
        logout()
        throw new Error(`Failed to refresh token: ${response.statusText}`);
      }
  
      const responseData = await response.json();

      console.log("response data" +responseData.access_token)
      if (responseData.access_token == undefined) {
        console.log("refresh failed")
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        handleFailedRefresh();
      }
      else {
        localStorage.setItem('access_token', responseData.access_token);
        console.log("successfully refreshed token")
      }
    } catch (error) {
      console.log(error)
      console.log("did not refresh")
      logout();
    }  }, [logout]);


  const validate = useCallback(async (access_token) => {
    try {
      console.log("entering validate function")
      console.log("validate checking "+access_token)

      const response = await fetch(`http://localhost:5000/token_valid?access_token=${access_token}`);
      const data = await response.json();
      const trueOrFalse = data.valid;

      if (trueOrFalse) {
        console.log("token validated")
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


  useEffect(() => {
    const handleValidation = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      if (access_token) {
        console.log("has access_token: "+access_token)
        if (await validate(access_token)) {
        } else {
          await refreshToken(refresh_token);
        }
      } else {
        logout();
      }
    };

    if (trackData[0]) {
      return;
    }
    else {
      handleValidation();
    }
  }, [logout, refreshToken, validate]);

  return (
    <div>
      { children }
    </div>
  );
}

export default Layout;

