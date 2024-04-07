import React from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import Login from '../Login/Login';
import MarketStatus from '../MarketStatus/MarketStatus';
import News from '../News/News';
import Register from '../Register/Register';
import SymbolSearch from '../SymbolSearch/SymbolSearch';
import Trades from '../Trades/Trades';
import WatchList from '../WatchList/WatchList';
import Exchanges from '../Exchanges/Exchanges';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='logo'>Porfolio Pro</h1>
        <Exchanges />
        <MarketStatus/>
      </header>
      <main className='App-main'>

      </main>
    </div>
  );
}

export default App;
