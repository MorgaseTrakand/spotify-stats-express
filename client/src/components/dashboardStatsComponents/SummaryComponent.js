import ArtistCard from '../../pages/artistCard';
import TrackCard from '../../pages/trackCard'; 
import { useEffect, useState } from 'react';

function SummaryComponent({ artistsData, trackData }) {

  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>

      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container'>
          <h1>Top Artists</h1>
          <div className='topArtists'>
            <div className='image-carosel'>
              {/* <img className='second-image round' src={img2URL}></img>
              <img className='first-image round img-custom-margin' src={img1URL}></img>
              <img className='third-image round' src={img3URL}></img> */}
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
                  {/* <img className='second-image' src={trackData[1].image[0].url}></img>
                  <img className='first-image' src={trackData[0].image[0].url}></img>
                  <img className='second-image' src={trackData[2].image[0].url}></img> */}
                </div>
                {trackData.map((track, index) => (
                  <TrackCard
                    key={index}
                    imageSrc={track.image[0].url}
                    trackName={track.name}
                    artistName={track.artist || 'Unknown'}
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