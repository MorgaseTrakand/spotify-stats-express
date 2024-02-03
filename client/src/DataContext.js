import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [artistsData, setArtistsData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [username, setUsername] = useState([]);

  return (
    <DataContext.Provider value={{ artistsData, setArtistsData, trackData, setTrackData, genreData, setGenreData, username, setUsername }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};