import ArtistCard from '../../pages/artistCard';
import TrackCard from '../../pages/trackCard'; 

function SummaryComponent({ artistsData, trackData }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container'>
          <h1>Top Artists</h1>
          <div className='topArtists'>
            {artistsData.map((artist, index) => (
              <ArtistCard
                key={index}
                imageSrc={artist.image[0].url} 
                artistName={artist.name}
                position={artist.position}
              />
            ))}
          </div>
          </div>
            <div className='topArtists-container'>
              <h1>Top Tracks</h1>
              <div className='topArtists'>
                {trackData.map((track, index) => (
                  <TrackCard
                    key={index}
                    imageSrc={track.image[0].url}
                    trackName={track.name}
                    artistName={track.artist || 'Unknown'}
                    position={track.position}
                  />
                ))}
              </div>
            </div>
          </div>
    
        </div>
  );
}

export default SummaryComponent;