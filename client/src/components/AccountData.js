import { useEffect } from 'react';
import { useDataContext } from '../DataContext';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const AccountWrapper = ({ children }) => {
  const { setUserData } = useDataContext();

  useEffect(() => {
    gatherData(localStorage.getItem('access_token'))
  }, []);


  function gatherData(access_token) {
    fetch(`https://spotify-stats-express-backend.onrender.com/account-data?access_token=${access_token}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setUserData(data)
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  return (
    <div>
      { children }
    </div>
  );
}

export default AccountWrapper;