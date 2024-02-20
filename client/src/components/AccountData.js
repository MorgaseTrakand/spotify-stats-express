import { useEffect } from 'react';
import { useDataContext } from '../DataContext';


/* This function will serve as a higher-order component (HOC) that will wrap any page that requires the gathering of data

It basically saves the page.js files from clutter so that the focus for those files can be UI only
*/ 
const AccountWrapper = ({ children }) => {
  const { setUserData } = useDataContext();

  function gatherData() {
    fetch(`http://localhost:5000/account-data`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(data => {
      console.log(data)
      setUserData(data)
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  useEffect(() => {
    gatherData()
  }, [])

  return (
    <div>
      { children }
    </div>
  );
}

export default AccountWrapper;