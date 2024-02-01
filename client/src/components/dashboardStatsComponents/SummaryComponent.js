import ArtistCard from '../../pages/artistCard';
import TrackCard from '../../pages/trackCard'; 
import GenreCard from '../../pages/genreCard';
import { useEffect, useState } from 'react';

function SummaryComponent({ artistsData, trackData, genreData }) {
  const [img1URL, setimg1URL] = useState();
  const [img2URL, setimg2URL] = useState();
  const [img3URL, setimg3URL] = useState();

  const [trackimg1URL, settrackimg1URL] = useState();
  const [trackimg2URL, settrackimg2URL] = useState();
  const [trackimg3URL, settrackimg3URL] = useState();


  useEffect(() => {
    if (artistsData && artistsData.length > 0 && artistsData[0].image) {
      setimg1URL(artistsData[0].image[0].url);
      setimg2URL(artistsData[1].image[0].url);
      setimg3URL(artistsData[2].image[0].url);
    }
    if (trackData && trackData.length > 0 && trackData[0].image) {
      settrackimg1URL(trackData[1].image[0].url)
      settrackimg2URL(trackData[0].image[0].url)
      settrackimg3URL(trackData[2].image[0].url)
    }
  }, [artistsData, trackData]);

  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container'>
          <h1 className='stat-label'>Top Artists</h1>
          <div className='topArtists'>
            <div className='image-carosel'>
              <img className='second-image round' src={img2URL}></img>
              <img className='first-image round img-custom-margin' src={img1URL}></img>
              <img className='third-image round' src={img3URL}></img>
            </div>
            {artistsData.slice(0, 10).map((artist, index) => (
              <ArtistCard
                key={index}
                imageSrc={artist.image[0].url} 
                artistName={artist.name}
                position={artist.position}
                id={artist.id}
              />
            ))}
          </div>
          </div>
            <div className='topArtists-container'>
              <h1 className='stat-label'>Top Tracks</h1>
              <div className='topArtists'>
                <div className='image-carosel'>
                  <img className='second-image' src={trackimg1URL}></img>
                  <img className='first-image' src={trackimg2URL}></img>
                  <img className='second-image' src={trackimg3URL}></img>
                </div>
                {trackData.slice(0, 10).map((track, index) => (
                  <TrackCard
                    key={index}
                    imageSrc={track.image[0].url}
                    trackName={track.name}
                    artistNames={track.artist.map(artist => artist).join(' / ') || 'Unknown'}
                    position={track.position}
                    id={track.id}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='dashboard-flexbox-container'>
            <div className='album-container'>
              <h1 className='stat-label'>Top Albums</h1>
              <div className='albums'></div>
            </div>
            <div className='genre-container'>
              <h1 className='stat-label'>Top Genres</h1>
              <div className='genres'>
              {genreData.slice(0, 10).map((genre, index) => (
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

export default SummaryComponent;