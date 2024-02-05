import React from 'react';
import './allCards.css'; // Add this line

const GenreCard = ({ genreName, position }) => (
  <div className="genre-card focus">
    <p>{position}</p>
    <h2>{genreName}</h2>
  </div>
);

export default GenreCard;