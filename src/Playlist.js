import React from 'react';
import TrackList from './TrackList';

function Playlist({ playlistName, playlistTracks }) {
  return (
    <div>
      <h2>{playlistName}</h2>
      <input type="text" placeholder="Enter playlist name" />
      <TrackList tracks={playlistTracks} />
      <button>Save Playlist to Spotify</button>
    </div>
  );
}

export default Playlist;