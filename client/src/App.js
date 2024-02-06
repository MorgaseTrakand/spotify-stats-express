import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage';
import React from 'react';
import { DataProvider } from './DataContext';
import AuthorizedPage from './pages/dashboardPage';
import AccountPage from './pages/AccountPage';

function App() {

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
