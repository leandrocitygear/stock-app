import React, { useState, useEffect } from 'react';
import './WatchList.css';
import SymbolSearch from '../Trades/SymbolSearch/SymbolSearch';

const base = 'https://finnhub.io/api/v1';

const WatchList = () => {
  const [symbols, setSymbols] = useState(() => {
    const storedSymbols = localStorage.getItem('watchlist_symbols');
    return storedSymbols ? JSON.parse(storedSymbols) : [];
  });
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [debouncedSymbol, setDebouncedSymbol] = useState('');

  useEffect(() => {
    localStorage.setItem('watchlist_symbols', JSON.stringify(symbols));
  }, [symbols]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSymbol(selectedSymbols);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [selectedSymbols]);

  useEffect(() => {
    if (debouncedSymbol.length > 0) {
      const addQuote = `${base}/quote?symbol=${debouncedSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  
      fetch(addQuote)
        .then(response => response.json())
        .then(json => {
          console.log("Quote for", debouncedSymbol, ":", json);
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
                <th style={{ textAlign: 'right' }}>Change</th>
                <th style={{ textAlign: 'right' }}>% Change</th>
                <th style={{ textAlign: 'right' }}>High</th>
                <th style={{ textAlign: 'right' }}>Low</th>
                <th style={{ textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((symbol, index) => (
                <tr key={index}>
                  <td style={{width: '27px', textAlign:'left',}}>{index + 1}</td>
                  <td style={{width: '50px', textAlign:'left',}}>{symbol.symbol}</td>
                  <td className={symbol.quote.c > 0 ? 'positive' : 'negative'} style={{width: '50px', textAlign:'right',}}>{symbol.quote.c }</td>
                  <td className={symbol.quote.d > 0 ? 'positive' : 'negative'} style={{width: '50px', textAlign:'right',}}>{symbol.quote.d }</td>
                  <td className={symbol.quote.dp > 0 ? 'positive' : 'negative'} style={{width: '50px', textAlign:'right',}}>{symbol.quote.dp}</td>
                  <td style={{width: '50px', textAlign:'right',}}>{symbol.quote.h}</td>
                  <td style={{width: '50px', textAlign:'right',}}>{symbol.quote.l}</td>
                  <td style={{width: '10px', textAlign:'center',}}>
                    <button className='rembtn' onClick={() => handleRemoveSymbol(symbol.symbol)}>x</button>
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
