import React from 'react';
import './allCards.css'; // Add this line

const GenreCard = ({ genreName, position, className}) => (
  <div className={`genre-card focus ${className}`}>
    <p>{position}</p>
    <h2>{genreName}</h2>
  </div>
);

export default GenreCard;