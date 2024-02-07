import GenreCard from "../../pages/genreCard";

function GenreComponent({ genreData }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'></div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component-genre'>
          <h1 className="stat-label focus">Top Genres</h1>
          <div className='topArtists'>
            {genreData.slice(0, 50).map((genre, index) => (
              <GenreCard
                key={index}
                genreName={genre[0]}
                position={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreComponent;