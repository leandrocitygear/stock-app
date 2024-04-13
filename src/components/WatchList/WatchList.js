import React, { useState, useEffect } from 'react';
import './WatchList.css';
import SymbolSearch from '../Trades/SymbolSearch/SymbolSearch';

const base = 'https://finnhub.io/api/v1';

const WatchList = () => {
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [debouncedSymbol, setDebouncedSymbol] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSymbol(selectedSymbols);
    }, 500); // Adjust debounce delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(timerId);
    };
  }, [selectedSymbols]);

  useEffect(() => {
    if (debouncedSymbol.length > 0) { // Check if debouncedSymbol is not empty
      const addQuote = `${base}/quote?symbol=${debouncedSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  
      fetch(addQuote)
        .then(response => response.json())
        .then(json => {
          console.log("Quote for", debouncedSymbol, ":", json); // Log quote data
          setSymbols(prevSymbols => [...prevSymbols, { symbol: debouncedSymbol, quote: json }]);
        })
        .catch(error => {
          console.error("Error fetching quote:", error);
        });
    }
  }, [debouncedSymbol]);

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbols(symbol);
  };

  const handleRemoveSymbol = (symbolToRemove) => {
    const updatedSymbols = symbols.filter(symbol => symbol.symbol !== symbolToRemove);
    setSymbols(updatedSymbols);
  };

  return (
    <div className='wlpanel'>
      <header className='title'>
        <h3 className='name'>Watch List</h3>
        <SymbolSearch onSymbolSelect={handleSymbolSelect} />
      </header>
      <main>
        {symbols.length > 0 && (
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>#</th>
                <th style={{ textAlign: 'left' }}>Symbol</th>
                <th style={{ textAlign: 'right' }}>Last Price</th>
                {/* Add other columns for quote data as needed */}
                <th style={{ textAlign: 'right' }}>Change</th>
                <th style={{ textAlign: 'right' }}>% Change</th>
                <th style={{ textAlign: 'right' }}>High</th>
                <th style={{ textAlign: 'right' }}>Low</th>
                <th style={{ textAlign: 'center' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((symbol, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{symbol.symbol}</td>
                  <td>{symbol.quote.c }</td>
                  <td>{symbol.quote.d }</td>
                  <td>{symbol.quote.dp}</td>
                  <td>{symbol.quote.h}</td>
                  <td>{symbol.quote.l}</td>
                  <td>
                    <button onClick={() => handleRemoveSymbol(symbol.symbol)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {symbols.length === 0 && (
          <p>No symbols added yet</p>
        )}
      </main>
    </div>
  )
}

export default WatchList;
