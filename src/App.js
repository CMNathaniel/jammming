import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = term => {
    console.log("Searching for:", term);
    Spotify.search(term).then(results => {
      console.log("Search results:", results);
      setSearchResults(results);
    });
  };

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  return (
    <div className="App">
      <h1>Jammming App</h1>
      <div className="search-bar">
        <SearchBar onSearch={search} />
      </div>
      <div className="container">
        <div className="search-results">
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        </div>
        <div className="playlist">
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onNameChange={handleNameChange} 
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
