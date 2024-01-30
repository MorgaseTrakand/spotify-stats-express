import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage';
import React, { useState } from 'react';
import { DataProvider } from './DataContext';
import AuthorizedPage from './pages/authorizedPage';

function App() {
  const [accessToken, setAccessToken] = useState('Initial value');

  return (
    <Router>
      <DataProvider>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<AuthorizedPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </div>
        </DataProvider>
    </Router>
  );
}

export default App;
