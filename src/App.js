import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';


function App() {
  return (
    <div className="App">
      <SearchBar />
      <SearchResults />
      <Playlist />
    </div>
  );
}

export default App;
