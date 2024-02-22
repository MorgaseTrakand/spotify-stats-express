import ArtistCard from '../../pages/artistCard';
import DropDown from "../DropDown"
import { useEffect } from 'react';

function ArtistComponent({ artistsData, setTerm, artistPopularity }) {
  function setAdditionalData(data) {
    const popular = document.querySelector(".popular-artist");
    const average = document.querySelector(".average-artist");
    const obscure = document.querySelector(".obscure-artist");
    const parent = document.querySelector(".parent-bar")


    if (parent) {
      const elementWidth = parent.clientWidth;

      const pValue = elementWidth * ((data.Popular * 2) / 100)
      const aValue = elementWidth * ((data.Average * 2) / 100)
      const oValue = elementWidth * ((data.Obscure * 2)/ 100)

      popular.style.width = pValue+"px";
      average.style.width = aValue+"px";
      obscure.style.width = oValue+"px";
    }
  }
  useEffect(() => {
    setAdditionalData(artistPopularity)
  })
  return (
    <div className='outlined-stats-container'>
      <div className='glassmorphism-test'>
        <DropDown setTerm={setTerm}/>
      </div>

      <div className='dashboard-flexbox-container'>
        <div className='topArtists-container solo-component'>
          <h1 className='stat-label focus'>Top Artists</h1>
            <div className='topArtists'>
              {artistsData.slice(0, 50).map((artist, index) => (
                <ArtistCard
                  key={index}
                  imageSrc={artist.image[1].url} 
                  artistName={artist.name}
                  position={artist.position}
                  id={artist.id}
                  className={index === 49 ? 'last-track' : ''}
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
                    <div className='green-bar popular-artist'></div>
                  </div>
                </div>
                <div className='bento-positioning'>
                  <h2>Average</h2>
                  <div className='green-bar average-artist'></div>
                </div>
                <div className='bento-positioning'>
                  <h2>Obscure</h2>
                  <div className='green-bar obscure-artist'></div>
                </div>
              </div>              
            </div>
          </div>
    
        </div>
  );
}

export default ArtistComponent;