import React from 'react';
import './trackCard.css'; // Add this line

const TrackCard = ({ imageSrc, trackName, artistName, position }) => (
  <div className="track-card">
    <img src={imageSrc} alt={`Song ${trackName}`} />
    <h3>{trackName}</h3>
    <h3>{artistName}</h3>
    <p>{position}</p>
  </div>
);

export default TrackCard;