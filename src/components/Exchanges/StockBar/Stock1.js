import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock1 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=AAPL&token=${process.env.REACT_APP_API_KEY}`;

    fetch(indexBarSymbol)
    .then(response => response.json())
    .then(json => {
    setStockBar(json);
    }).catch(error => {
      console.error("Error fetching search results:", error);
    });

  }, [])


  return (
    <div>
      <p className='sym'>$AAPl <span className='price'>{stockBar.c}</span><br /><span className={stockBar.d > 0 ? 'positive' : 'negative'}>
      {stockBar.d > 0 ? '+' : '-'}{Math.abs(stockBar.d)} ({stockBar.dp > 0 ? '+' : '-'}{Math.abs(stockBar.dp)}%)
    </span></p>
    </div>
  )
}

export default Stock1;