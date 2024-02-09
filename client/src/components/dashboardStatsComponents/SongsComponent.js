import { useEffect } from 'react';
import TrackCard from '../../pages/trackCard'; 
import DropDown from "../DropDown"

function SongsComponent({ trackData, setTerm, songPopularity, songLength}) {
  function setAdditionalData(data, length) {
    console.log(length)
    const popular = document.querySelector(".popular");
    const average = document.querySelector(".average");
    const obscure = document.querySelector(".obscure");

    const lengthShort = document.querySelector(".length_short");
    const lengthAverage = document.querySelector(".length_average");
    const lengthLong = document.querySelector(".length_long");

    const parent = document.querySelector(".parent-bar")

    if (parent) {
      const elementWidth = parent.clientWidth;

      const pValue = elementWidth * ((data.Popular * 2) / 100)
      const aValue = elementWidth * ((data.Average * 2) / 100)
      const oValue = elementWidth * ((data.Obscure * 2)/ 100)

      const sValue = elementWidth * ((length.Short * 2) / 100)
      const aaValue = elementWidth * ((length.Average * 2) / 100)
      const lValue = elementWidth * ((length.Long * 2) / 100)

      lengthShort.style.width = sValue+"px";
      lengthAverage.style.width = aaValue+"px";
      lengthLong.style.width = lValue+"px";

      popular.style.width = pValue+"px";
      average.style.width = aValue+"px";
      obscure.style.width = oValue+"px";
    }
  }
  useEffect(() => {
    setAdditionalData(songPopularity, songLength)
  })
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>
        <DropDown setTerm={setTerm}/>
      </div>
      
      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component'>
          <h1 className='stat-label focus'>Top Tracks</h1>  
          <div className='topArtists'>
            {trackData.slice(0, 50).map((track, index) => (
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
          <div className='bento-box first-box'>
            <h1>By Popularity</h1>
            <div className='bento-positioning'>
              <h2>Popular</h2>
              <div className='parent-bar'>
                <div className='green-bar popular'></div>
              </div>
            </div>
            <div className='bento-positioning'>
              <h2>Average</h2>
              <div className='green-bar average'></div>
            </div>
            <div className='bento-positioning'>
              <h2>Obscure</h2>
              <div className='green-bar obscure'></div>
            </div>
          </div>
          <div className='bento-box'>
            <h1>By Length</h1>
            <div className='bento-positioning'>
              <h2>Short</h2>
              <div className='parent-bar'>
                <div className='green-bar length_short'></div>
              </div>
            </div>
            <div className='bento-positioning'>
              <h2>Average</h2>
              <div className='green-bar length_average'></div>
            </div>
            <div className='bento-positioning'>
              <h2>Long</h2>
              <div className='green-bar length_long'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongsComponent;