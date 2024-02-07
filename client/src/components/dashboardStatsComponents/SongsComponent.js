import TrackCard from '../../pages/trackCard'; 

function SongsComponent({ trackData }) {

  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>
      
      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component'>
          <h1 className='stat-label focus'>Top Tracks</h1>  
          <div className='topArtists'>
            {trackData.slice(0, 10).map((track, index) => (
                <TrackCard
                  key={index}
                  imageSrc={track.image[1].url}
                  trackName={track.name}
                  artistNames={track.artist.map(artist => artist).join(' / ') || 'Unknown'}
                  position={track.position}
                  id={track.id}
                />
              ))}
          </div>
        </div>
        <div className='bento-box-container'>
          <div className='bento-box first-box'></div>
          <div className='bento-box'></div>
        </div>
      </div>
    </div>
  );
}

export default SongsComponent;