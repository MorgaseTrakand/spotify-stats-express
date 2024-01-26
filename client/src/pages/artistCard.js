import React from 'react';
import './artistCard.css'; // Add this line

const ArtistCard = ({ imageSrc, artistName, position }) => (
  <div className="artist-card">
    <p>{position}</p>
    <img src={imageSrc} alt={`Artist ${artistName}`} />
    <h3>{artistName}</h3>
  </div>
);

export default ArtistCard;