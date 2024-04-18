import React from 'react';
import TrackList from './TrackList';

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove }) {
  return (
    <div>
      <h2>{playlistName}</h2>
      <input type="text" placeholder="Enter playlist name" value={playlistName} onChange={onNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove}/>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;