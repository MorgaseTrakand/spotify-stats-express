import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [artistsData, setArtistsData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [term, setTerm] = useState("long_term")

  return (
    <DataContext.Provider value={{ term, setTerm, artistsData, setArtistsData, trackData, setTrackData, genreData, setGenreData, albumData, setAlbumData, userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};