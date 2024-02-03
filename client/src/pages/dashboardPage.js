import '../App.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Data from '../components/Data'
import '../App.css';
import { useDataContext } from '../DataContext';
import SummaryComponent from '../components/dashboardStatsComponents/SummaryComponent';
import SongsComponent from '../components/dashboardStatsComponents/SongsComponent';
import VerifiedHeader from '../components/VerifiedHeader';


function AuthorizedPage() {
  const { artistsData, trackData, genreData, username } = useDataContext();
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
          <div className='shadow blue'></div>

          <div className='main-auth-container'>
          <VerifiedHeader />

            <div className='main-stats-container'>
              <div className='label-container'>
                <h1 className='username focus'>{username}</h1>
                <div className='positioning-div'>
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

              <div className='outlined-stats-container'>
                {renderSwitch === 1 ? (
                  <SummaryComponent trackData={trackData} artistsData={artistsData} genreData={genreData}/>
                ) : renderSwitch === 2 ? (
                  <SongsComponent trackData={trackData} />
                ) : renderSwitch === 3 ? (
                  <SummaryComponent trackData={trackData} artistsData={artistsData} />
                ) : renderSwitch === 4 ? (
                  <SummaryComponent trackData={trackData} artistsData={artistsData} />
                ) : (
                  <SummaryComponent trackData={trackData} artistsData={artistsData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Data>
    </Layout>
  );
}

export default AuthorizedPage;