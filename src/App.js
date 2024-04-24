import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';


function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Baby Baby", artist: "Artist1", album: "Album1", uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6" },
    { id: 2, name: "Monster Mash", artist: "Artist2", album: "Album2", uri: "spotify:track:5CQ30WqJwcep0pYcV4AMNc" },
    { id: 3, name: "Eclipse", artist: "Artist3", album: "Album3", uri: "spotify:track:2xLMifQCjDGFmkHkpNLD9h" },
  ]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: "Why Forever?", artist: "Artist4", album: "Album4" },
    { id: 5, name: "Love me Always", artist: "Artist5", album: "Album5" },
    { id: 6, name: "No way Jose", artist: "Artist6", album: "Album6" },
  ]);

  const search = term => {
    Spotify.search(term).then(results => {
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
