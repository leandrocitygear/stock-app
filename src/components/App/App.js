import React from 'react';
import './App.css';
import MarketStatus from '../MarketStatus/MarketStatus';
import News from '../News/News';
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
        <Trades/>
        <News />
        <WatchList/>
      </main>
      <div className='noPhone'>View app on desktop for a better experience</div>
    </div>
  );
}

export default App;
