import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock3 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=NFLX&token=${process.env.REACT_APP_API_KEY}`;

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
      {stockBar.map((stock3, index) => (
      <p key={index} className='sym'>$NFLX <span className='price'>{stock3.c}</span><br /><span className={stock3.d > 0 ? 'positive' : 'negative'}>
      {stock3.d > 0 ? '+' : '-'}{Math.abs(stock3.d)} ({stock3.dp > 0 ? '+' : '-'}{Math.abs(stock3.dp)}%)
    </span></p>
      ))}
    </div>
  )
}

export default Stock3;