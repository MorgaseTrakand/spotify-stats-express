function calculateGenres(data) {
  console.log(data)
  const genreCounts = {};
  data.artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const genreArray = Object.entries(genreCounts);
  const sortedGenreArray = genreArray.sort((a, b) => b[1] - a[1]);

  const capitalizedGenreArray = sortedGenreArray.map(([genre, count]) => {
    const words = genre.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedGenre = capitalizedWords.join(' ');
    return [capitalizedGenre, count];
  });
  return capitalizedGenreArray;
}

function calculateAlbums(data) {
  const albumCounts = {};
    data.songs.forEach(song => {
      if (song.albums.album_type == "ALBUM") {
        var tempArray = [song.albums.name, song.albums.images[0].url, song.albums.artists[0].name]
        albumCounts[tempArray] = (albumCounts[tempArray] || 0) + 1;
      }
    })

    const albumArray = Object.entries(albumCounts); 
    const sortedAlbumArray = albumArray.sort((a, b) => b[1] - a[1]);

    sortedAlbumArray.forEach((album, index) => {
      const parts = album[0].split(',');
      sortedAlbumArray[index] = parts;
    })
    return sortedAlbumArray;
}
function calculateSongStats(data) {
  data.songs.forEach((song) => {
    const length = song.length / 60
    const tempPopularity = song.popularity
    if (length < 2.5) {
      currentValue = data.song_length["Short"]
      data.song_length["Short"] = currentValue + 1
    }
    else if (length < 4) {
      currentValue = data.song_length["Average"]
      data.song_length["Average"] = currentValue + 1
    }
    else {
      currentValue = data.song_length["Long"]
      data.song_length["Long"] = currentValue + 1
    }
    if (tempPopularity < 40) {
      currentValue = data.song_popularity["Obscure"]
      data.song_popularity["Obscure"] = currentValue + 1
    }
    else if (tempPopularity < 75) {
      currentValue = data.song_popularity["Average"]
      data.song_popularity["Average"] = currentValue + 1
    }
    else {
      currentValue = data.song_popularity["Popular"]
      data.song_popularity["Popular"] = currentValue + 1
    }
  })
}

function calculateArtistStats(data) {
  data.artists.forEach((artist) => {
    const tempPopularity = artist.popularity
    if (tempPopularity < 40) {
      currentValue = data.artist_popularity["Obscure"]
      data.artist_popularity["Obscure"] = currentValue + 1
    }
    else if (tempPopularity < 75) {
      currentValue = data.artist_popularity["Average"]
      data.artist_popularity["Average"] = currentValue + 1
    }
    else {
      currentValue = data.artist_popularity["Popular"]
      data.artist_popularity["Popular"] = currentValue + 1
    }
  })
}

module.exports = {
  calculateGenres,
  calculateAlbums,
  calculateSongStats,
  calculateArtistStats
  // Export other functions...
};
