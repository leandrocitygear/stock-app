import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock6 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=MSFT&token=${process.env.REACT_APP_API_KEY}`;

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
      {stockBar.map((stock6, index) => (
      <p key={index} className='sym'>$MSFT <span className='price'>{stock6.c}</span><br /><span className={stock6.d > 0 ? 'positive' : 'negative'}>
      {stock6.d > 0 ? '+' : '-'}{Math.abs(stock6.d)} ({stock6.dp > 0 ? '+' : '-'}{Math.abs(stock6.dp)}%)
    </span></p>
      ))}
    </div>
  )
}

export default Stock6;