import React from 'react';
import './allCards.css'; // Add this line

const ArtistCard = ({ imageSrc, artistName, position, id }) => {
  const artistCode = id;
  const handleArtistRedirect = () => {
    window.open(`https://open.spotify.com/artist/${artistCode}`, '_blank');
  };
  
  return (
    <div className="artist-card focus">
      <p>{position}</p>
      <img onClick={handleArtistRedirect} src={imageSrc} alt={`Artist ${artistName}`} />
      <h3 onClick={handleArtistRedirect}>{artistName}</h3>
    </div>
  );
};

export default ArtistCard;