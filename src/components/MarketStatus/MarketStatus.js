import React, {useEffect, useState} from 'react';
import './MarketStatus.css';

const base = 'https://finnhub.io/api/v1';

const MarketStatus = () => {

  const [marketStatus, setMarketStatus] = useState(null)

  useEffect(() => {
    const marketstad = `${base}/stock/market-status?exchange=US&token=${process.env.REACT_APP_API_KEY}`;

    fetch(marketstad)
    .then(response => response.json())
    .then(json => {
    setMarketStatus(json);
    }).catch(error => {
      console.error("Error fetching search results:", error);
    });
  }, [])


  return (
    <div className='Market'>
      {marketStatus !== null && (
        <p>Market : {marketStatus.isOpen ? <span className='open'>Open</span> : <span className='closed'>Closed</span>} {marketStatus.session}</p>
      )}

    
    </div>
  )
}

export default MarketStatus;