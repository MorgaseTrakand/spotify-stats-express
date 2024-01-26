import TrackCard from '../../pages/trackCard'; 

function SongsComponent({ trackData }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container'>
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

export default SongsComponent;