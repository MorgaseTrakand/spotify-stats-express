async function handleClick(navigate) {
  if (localStorage.getItem("access_token")) {
    console.log("access_token found redirecting to dashboard");
    navigate('/dashboard');
  } else {
    try {
      const response = await fetch('http://localhost:5000/login');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

export default handleClick;