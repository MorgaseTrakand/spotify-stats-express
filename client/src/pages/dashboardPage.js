import '../App.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Data from '../components/Data'
import { useDataContext } from '../DataContext';
import SummaryComponent from '../components/dashboardStatsComponents/SummaryComponent';
import SongsComponent from '../components/dashboardStatsComponents/SongsComponent';
import ArtistComponent from '../components/dashboardStatsComponents/ArtistComponent';
import AlbumComponent from '../components/dashboardStatsComponents/AlbumComponent'; 
import GenreComponent from '../components/dashboardStatsComponents/GenreComponent';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';

function AuthorizedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { artistsData, trackData, genreData, albumData, userData} = useDataContext();
  const username = userData[1]

  useEffect(() => {
    const spinner = document.querySelector(".lds-ring");
    const outlinedContainer = document.querySelector(".outlined-stats-container")

    if (artistsData[0] && albumData[0] && artistsData[0] && genreData[0]) {
      setIsLoading(false)
      if (isLoading) {
        spinner.classList.add("display-none");
        outlinedContainer.classList.remove("add-blur");
      }
    }
  }, [artistsData, trackData, genreData, albumData, isLoading])


  const [renderSwitch, setRenderSwitch] = useState(1);
  const [labelVisibility, setLabelVisibility] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  function handleLabelClick(label) {
    setRenderSwitch(label)
    setLabelVisibility({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    })
    setLabelVisibility({ [label]: true });
  }

  const getLabelName = {
    1: "Summary",
    2: "Songs",
    3: "Artists",
    4: "Albums",
    5: "Genres"
  }

  return (
    <Layout>
      <Data>
        <div className='hero'>
          {/* <div className='shadow purple'></div>
          <div className='shadow red'></div> */}
          <div className='shadoww auth-blue'></div>
          <div className='shadoww blue2'></div>

          <div className='main-auth-container'>
          <AuthHeader />
            <div className='main-stats-container'>
              <div className='label-container'>
                <h1 className='username focus'>{username}</h1>
                <div className='positioning-div label-container-positioning'>
                  {[1, 2, 3, 4, 5].map((label) => (
                    <h1
                      key={label}
                      className={`focus  ${labelVisibility[label] ? 'no-after' : ''}`}
                      onClick={() => handleLabelClick(label)}
                    >
                      {getLabelName[label]}
                      <div className={`bottom-green-border ${labelVisibility[label] ? '' : 'hidden'}`}></div>
                    </h1>
                  ))}
                </div>
              </div>
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              <div className='outlined-stats-container add-blur'>
                {renderSwitch === 1 ? (
                  <SummaryComponent trackData={trackData} artistsData={artistsData} genreData={genreData} albumData={albumData} />
                ) : renderSwitch === 2 ? (
                  <SongsComponent trackData={trackData} />
                ) : renderSwitch === 3 ? (
                  <ArtistComponent artistsData={artistsData} />
                ) : renderSwitch === 4 ? (
                  <AlbumComponent albumData={albumData} />
                ) : (
                  <GenreComponent genreData={genreData} />
                )}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </Data>
    </Layout>
  );
}

export default AuthorizedPage;