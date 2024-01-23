import { useNavigate } from 'react-router-dom';


export async function usePagePreCheck() {
  const navigate = useNavigate();

  if (localStorage.getItem("access_token")) {
    try {
      console.log("has access token")
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:5000/token_valid?access_token=${access_token}`);
      const data = await response.json();
      const IsValid = data.isValid;
      console.log("data valid "+ IsValid)

      if (IsValid) {
        console.log(true);
        return true;
      } else {
        await refreshToken(navigate);
        return false;
      }
    } catch (error) {
      console.error('Error checking validity:', error);
      return false;
    }
  } else {
    logout(navigate)
  }
}

export async function refreshToken(navigate) {
  const refresh_token = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      //client_id: clientId
    }),
  }

  try {
    const response = await fetch(url, payload);
    if (!response.ok) {
      logout(navigate)
      throw new Error('Failed to refresh token');
    }

    const responseData = await response.json();

    localStorage.setItem('access_token', responseData.access_token);
    localStorage.setItem('refresh_token', responseData.refresh_token);
  } catch (error) {
    throw new Error('Error refreshing token: ' + error.message);
  }
}

export function logout(navigate) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  navigate('/')
}
