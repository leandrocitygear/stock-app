import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock2 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=META&token=${process.env.REACT_APP_API_KEY}`;

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
      {stockBar.map((stock2, index) => (
      <p key={index} className='sym'>$META <span className='price'>{stock2.c}</span><br /><span className={stock2.d > 0 ? 'positive' : 'negative'}>
      {stock2.d > 0 ? '+' : '-'}{Math.abs(stock2.d)} ({stock2.dp > 0 ? '+' : '-'}{Math.abs(stock2.dp)}%)
    </span></p>
      ))}
    </div>
  )
}

export default Stock2;