import React from 'react';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div>
      {searchResults.map(track => (
        <div key={track.id}>
          <h2>{track.name}</h2>
          <p>{track.artist} | {track.album}</p>
          <button onClick={() => onAdd(track)}>+</button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;