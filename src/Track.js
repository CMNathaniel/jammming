import React from 'react';

function Track({ track, onRemove }) {
  return (
    <div>
      <h3>{track.name}</h3>
      <p>{track.artist} | {track.album}</p>
      <button onClick={() => onRemove(track)}>-</button>
    </div>
  );
}

export default Track;