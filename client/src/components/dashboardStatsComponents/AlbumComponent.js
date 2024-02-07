import AlbumCard from "../../pages/albumCard";

function AlbumComponent({ albumData }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'></div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component-genre'>
          <h1 className="stat-label focus">Top Albums</h1>
          <div className='topArtists'>
            {albumData.slice(0, 50).map((album, index) => (
              <AlbumCard
                key={index}
                artistName={album[2]}
                albumName={album[0]}
                imageSrc={album[1]}
                position={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumComponent;