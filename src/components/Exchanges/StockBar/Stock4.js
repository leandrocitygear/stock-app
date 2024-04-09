import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock4 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=AMZN&token=${process.env.REACT_APP_API_KEY}`;

    fetch(indexBarSymbol)
    .then(response => response.json())
    .then(json => {
    setStockBar([json]);
    }).catch(error => {
      console.error("Error fetching search results:", error);
    });

  }, [])


  return (
    <div>
      {stockBar.map((stock4, index) => (
      <p key={index} className='sym'>$AMZN <span className='price'>{stock4.c}</span><br /><span className={stock4.d > 0 ? 'positive' : 'negative'}>
      {stock4.d > 0 ? '+' : '-'}{Math.abs(stock4.d)} ({stock4.dp > 0 ? '+' : '-'}{Math.abs(stock4.dp)}%)
    </span></p>
      ))}
    </div>
  )
}

export default Stock4;