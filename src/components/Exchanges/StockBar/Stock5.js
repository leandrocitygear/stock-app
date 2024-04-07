import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock5 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const indexBarSymbol = `${base}/quote?symbol=goog&token=${process.env.REACT_APP_API_KEY}`;

    fetch(indexBarSymbol)
    .then(response => response.json())
    .then(json => {
      console.log(json);
    setStockBar([json]);
    }).catch(error => {
      console.error("Error fetching search results:", error);
    });

  }, [])


  return (
    <div>
      {stockBar.map((stock5, index) => (
      <p key={index} className='sym'>$GOOG <span>{stock5.c}<br/>{stock5.d}({stock5.dp}%)</span></p>
      ))}
    </div>
  )
}

export default Stock5;