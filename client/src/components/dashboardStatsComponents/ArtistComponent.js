import ArtistCard from '../../pages/artistCard';

function ArtistComponent({ artistsData }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component'>
          <h1 className='stat-label focus'>Top Artists</h1>
            <div className='topArtists'>
              {artistsData.slice(0, 50).map((artist, index) => (
                <ArtistCard
                  key={index}
                  imageSrc={artist.image[1].url} 
                  artistName={artist.name}
                  position={artist.position}
                  id={artist.id}
                />
              ))}
             </div>
            </div>
          </div>
    
        </div>
  );
}

export default ArtistComponent;