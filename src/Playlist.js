import React from 'react';
import TrackList from './TrackList';

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) {
  return (
    <div>
      <h2>{playlistName}</h2>
      <input type="text" placeholder="Enter playlist name" value={playlistName} onChange={onNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove}/>
      <button onClick={onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;