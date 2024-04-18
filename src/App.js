import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';


function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Track1", artist: "Artist1", album: "Album1" },
    { id: 2, name: "Track2", artist: "Artist2", album: "Album2" },
    { id: 3, name: "Track3", artist: "Artist3", album: "Album3" },
  ]);

  const [playlistName, setPlaylistName] = useState("My New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: "Track4", artist: "Artist4", album: "Album4" },
    { id: 5, name: "Track5", artist: "Artist5", album: "Album5" },
    { id: 6, name: "Track6", artist: "Artist6", album: "Album6" },
  ]);

  return (
    <div className="App">
      <h1>Jammming App</h1>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="container">
        <div className="search-results">
          <SearchResults searchResults={searchResults}/>
        </div>
        <div className="playlist">
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
