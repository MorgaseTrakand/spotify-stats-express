import '../App.css';
import React, { useState } from 'react';
import { logout } from "./utils";
import ArtistCard from './artistCard';
import TrackCard from './trackCard';
import Layout from '../components/Layout'
import Data from '../components/Data'

function AuthorizedPage() {
  const [codeText, setCodeText] = useState();

  function handleLogout() {
    logout(navigate);
  }

  function handleRefreshandAccess() {
    setCodeText(localStorage.getItem('access_token') + " refresh " + (localStorage.getItem('refresh_token')))
  }

  function clearStorage() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
  
  return (
    <Layout>
      <Data>
        <div>
          <button onClick={topTracks}>Get Tracks</button>
          <br />
          <button onClick={topArtists}>Get Artists</button>
          <br />        
          <button onClick={handleLogout}>Logout</button>
          <br />
          <button onClick={clearStorage}>Clear</button>
          <br />
          <button onClick={handleRefreshandAccess}>Refresh and Access</button>
          <div>{codeText}</div>
          <div>
            {artistsData.map((artist, index) => (
              <ArtistCard
                key={index}
                imageSrc={artist.image[0].url} 
                artistName={artist.name}
                position={artist.position}
              />
            ))}
          </div>
          <div>
            {trackData.map((track, index) => (
              <TrackCard
                key={index}
                imageSrc={track.image[0].url}
                trackName={track.name}
                artistName={track.artist || 'Unknown'}
                position={track.position}
              />
            ))}
          </div>
        </div>
      </Data>
    </Layout>
  );
}

export default AuthorizedPage;