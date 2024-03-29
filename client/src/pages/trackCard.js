import React from 'react';
import './allCards.css'; // Add this line

const TrackCard = ({ imageSrc, trackName, artistNames, position, className }) => (
<div className={`track-card ${className}`}>
    <p>{position}</p>
    <div className='track-card-container focus'>
      <img src={imageSrc} alt={`Song ${trackName}`} />
      <div className='track-card-name-container'>
        <h2>{trackName}</h2>
        <h3>{artistNames}</h3>
      </div>
    </div>
  </div>
);

export default TrackCard;