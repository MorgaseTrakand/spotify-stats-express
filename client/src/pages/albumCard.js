import './allCards.css'; // Add this line

const AlbumCard = ({ imageSrc, albumName, position, artistName }) => {

  return (
<div className="track-card">
    <p>{position}</p>
    <div className='track-card-container focus'>
      <img src={imageSrc} alt={`Song ${albumName}`} />
      <div className='track-card-name-container'>
        <h2>{albumName}</h2>
        <h3>{artistName}</h3>
      </div>
    </div>
  </div>
  );
};

export default AlbumCard;