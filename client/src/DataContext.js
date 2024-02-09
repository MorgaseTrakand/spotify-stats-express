import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [artistsData, setArtistsData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [term, setTerm] = useState("long_term");
  const [songPopularity, setSongPopularity] = useState([]);
  const [artistPopularity, setArtistPopularity] = useState([]);
  const [songLength, setSongLength] = useState([]);
  const [validationHandler, setValidationHandler] = useState(1)

  const resetContext = () => {
    setArtistsData([]);
    setTrackData([]);
    setGenreData([]);
    setAlbumData([]);
    setUserData([]);
    setTerm("long_term");
    setSongPopularity([]);
    setArtistPopularity([]);
    setSongLength([]);
  };

  return (
    <DataContext.Provider value={{ validationHandler, setValidationHandler, songLength, setSongLength, artistPopularity, setArtistPopularity, songPopularity, setSongPopularity, term, setTerm, artistsData, setArtistsData, trackData, setTrackData, genreData, setGenreData, albumData, setAlbumData, userData, setUserData, resetContext }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};