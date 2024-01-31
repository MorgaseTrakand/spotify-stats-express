import ArtistCard from '../../pages/artistCard';
import TrackCard from '../../pages/trackCard'; 
import { useEffect, useState } from 'react';

function SummaryComponent({ artistsData, trackData }) {
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
      settrackimg1URL(trackData[0].image[0].url)
      settrackimg2URL(trackData[1].image[0].url)
      settrackimg3URL(trackData[2].image[0].url)
    }
  }, [artistsData, trackData]);

  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container'>
          <h1>Top Artists</h1>
          <div className='topArtists'>
            <div className='image-carosel'>
              <img className='second-image round' src={img2URL}></img>
              <img className='first-image round img-custom-margin' src={img1URL}></img>
              <img className='third-image round' src={img3URL}></img>
            </div>
            {artistsData.map((artist, index) => (
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
              <h1>Top Tracks</h1>
              <div className='topArtists'>
                <div className='image-carosel'>
                  <img className='second-image' src={trackimg1URL}></img>
                  <img className='first-image' src={trackimg2URL}></img>
                  <img className='second-image' src={trackimg3URL}></img>
                </div>
                {trackData.map((track, index) => (
                  <TrackCard
                    key={index}
                    imageSrc={track.image[0].url}
                    trackName={track.name}
                    artistNames={track.artist.map(artist => artist.name).join(' / ') || 'Unknown'}
                    position={track.position}
                    id={track.id}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* <div className='testest'>
            place next two boxes here
          </div> */}
        </div>
  );
}

export default SummaryComponent;