import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock5 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=GOOG&token=${process.env.REACT_APP_API_KEY}`;

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
      {stockBar.map((stock5, index) => (
      <p key={index} className='sym'>$GOOG <span className='price'>{stock5.c}</span><br /><span className={stock5.d > 0 ? 'positive' : 'negative'}>
      {stock5.d > 0 ? '+' : '-'}{Math.abs(stock5.d)} ({stock5.dp > 0 ? '+' : '-'}{Math.abs(stock5.dp)}%)
    </span></p>
      ))}
    </div>
  )
}

export default Stock5;