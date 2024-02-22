import GenreCard from "../../pages/genreCard";
import DropDown from "../DropDown"

function GenreComponent({ genreData, setTerm }) {
  
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>
        <DropDown setTerm={setTerm} />
      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component-genre'>
          <h1 className="stat-label focus">Top Genres</h1>
          <div className='topArtists'>
            {genreData.slice(0, 50).map((genre, index) => (
              <GenreCard
                key={index}
                genreName={genre[0]}
                position={index + 1}
                className={index === 49 ? 'last-track' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreComponent;