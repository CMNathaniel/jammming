import React from 'react';
import Track from './Track';

function TrackList({ tracks, onRemove }) {
  return (
    <div>
      {tracks.map(track => (
        <Track key={track.id} track={track} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default TrackList;