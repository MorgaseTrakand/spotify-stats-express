import React from 'react';
import './artistCard.css'; // Add this line

const ArtistCard = ({ imageSrc, artistName, position }) => (
  <div className="artist-card">
    <img src={imageSrc} alt={`Artist ${artistName}`} />
    <h3>{artistName}</h3>
    <p>{position}</p>
  </div>
);

export default ArtistCard;