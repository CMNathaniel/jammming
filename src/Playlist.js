import React from 'react';
import TrackList from './TrackList';

function Playlist() {
  return (
    <div>
      <input type="text" placeholder="Enter playlist name" />
      <TrackList />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;