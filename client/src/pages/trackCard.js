import React from 'react';
import './trackCard.css'; // Add this line

const TrackCard = ({ imageSrc, trackName, artistName, position, id }) => (
  <div className="track-card">
    <p>{position}</p>
    <div className='track-card-container'>
      <img src={imageSrc} alt={`Song ${trackName}`} />
      <div className='track-card-name-container'>
        <h2>{trackName}</h2>
        <h3>{artistName}</h3>
      </div>
    </div>
  </div>
);

export default TrackCard;