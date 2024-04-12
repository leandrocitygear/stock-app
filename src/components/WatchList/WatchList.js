import React, { useState } from 'react';
import './WatchList.css';

const WatchList = () => {
  const [symbols, setSymbols] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  const handleAddSymbol = (e) => {
    e.preventDefault();
    if (newSymbol.trim() !== '') {
      setSymbols([...symbols, newSymbol]);
      setNewSymbol('');
    }
  };

  const handleRemoveSelectedSymbols = () => {
    const updatedSymbols = symbols.filter(symbol => !selectedSymbols.includes(symbol));
    setSymbols(updatedSymbols);
    setSelectedSymbols([]);
  };

  const handleToggleSelectSymbol = (symbol) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter(selectedSymbol => selectedSymbol !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };

  return (
    <div className='wlpanel'>
      <header className='title'>
        <h3 className='name'>Watch List</h3>

        <form onSubmit={handleAddSymbol}>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter symbol"
        />
        <button type='submit'>Add</button>
        </form>

        {selectedSymbols.length > 0 && (
          <button onClick={handleRemoveSelectedSymbols}>Remove Selected</button>
        )}
      </header>
      <main>
        
        {symbols.length > 0 && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Symbol</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>High</th>
                <th>Low</th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((symbol, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedSymbols.includes(symbol)}
                      onChange={() => handleToggleSelectSymbol(symbol)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{symbol}</td>
                  <td>{/* Last price value */}</td>
                  <td>{/* Change value */}</td>
                  <td>{/* Percent change value */}</td>
                  <td>{/* High value */}</td>
                  <td>{/* Low value */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
      </main>
    </div>
  )
}

export default WatchList;
