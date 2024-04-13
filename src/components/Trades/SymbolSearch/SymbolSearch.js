import React, { useState } from 'react';
import './SymbolSearch.css';

const base = 'https://finnhub.io/api/v1';

const SymbolSearch = ({onSymbolSelect}) => {
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const apiSearch = `${base}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(apiSearch);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.result)) {
        setSearchResults(data.result);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setTerm(value);
    if (value.trim()) {
      handleSearch(value);
    } else {
      setSearchResults([]);
    }
  }

  const handleSelectSymbol = (symbol) => {
    setTerm(symbol);
    setSearchResults([]);
    onSymbolSelect(symbol)
  }

  return (
    <div className='SearchBar'>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Ticker"
        />
        <button className="Search" type="submit">GO</button>
      </form>
      <div className={`Dropdown ${searchResults.length > 0 ? 'show' : ''}`}>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleSelectSymbol(result.symbol)}>
              {result.symbol}: {result.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SymbolSearch;
