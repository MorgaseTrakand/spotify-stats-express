import React from 'react';
import './trackCard.css'; // Add this line

const GenreCard = ({ genreName, position }) => (
  <div className="track-card">
    <p>{position}</p>
    <div className='track-card-container'>
      <div className='track-card-name-container'>
        <h2>{genreName}</h2>
      </div>
    </div>
  </div>
);

export default GenreCard;