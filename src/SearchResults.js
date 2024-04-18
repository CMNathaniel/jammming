import React from 'react';

function SearchResults({ searchResults }) {
  return (
    <div>
      {searchResults.map(track => (
        <div key={track.id}>
          <h2>{track.name}</h2>
          <p>{track.artist} | {track.album}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;