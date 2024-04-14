import React, { useState, useEffect } from 'react';
import './App.css';
import MarketStatus from '../MarketStatus/MarketStatus';
import News from '../News/News';
import Trades from '../Trades/Trades';
import WatchList from '../WatchList/WatchList';
import Exchanges from '../Exchanges/Exchanges';

function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1080);
  const [activeComponent, setActiveComponent] = useState(isMobileView ? 'trades' : null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width <= 1080);
      if (width > 1080) {
        setActiveComponent(null); // Reset active component when width exceeds 1080px
      } else if (width <= 1080 && activeComponent === null) {
        setActiveComponent('trades'); // Set default active component to 'trades' when width is under 1080px and activeComponent is null
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeComponent]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='logo'>Portfolio Pro</h1>
        <Exchanges />
        <MarketStatus/>
      </header>
      {isMobileView && (
        <section className='mobileNav'>
          <button className='bNav bNav1' onClick={() => handleButtonClick('trades')}>Stock Info</button>
          <button className='bNav bNav2' onClick={() => handleButtonClick('news')}>Market News</button>
          <button className='bNav bNav3' onClick={() => handleButtonClick('watchlist')}>Watch List</button>
        </section>
      )}
      <main className='App-main'>
        {activeComponent === 'trades' && <Trades/>}
        {activeComponent === 'news' && <News />}
        {activeComponent === 'watchlist' && <WatchList/>}
        {!isMobileView && (
          <>
            <Trades />
            <News />
            <WatchList />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
