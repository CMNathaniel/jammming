import React, { useState } from 'react';
// import Spotify from './Spotify';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const handleTermChange = event => {
    setTerm(event.target.value);
  };

  const search = () => {
    props.onSearch(term);
  };

  return (
    <div>
      <input type="text" placeholder="Search for songs" onChange={handleTermChange} />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;