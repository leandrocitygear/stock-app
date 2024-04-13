import React, {useState, useEffect} from 'react';
import './Stock.css';


const base = 'https://finnhub.io/api/v1';

const Stock6 = () => {

  const [stockBar, setStockBar] = useState([])

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const indexBarSymbol = `${base}/quote?symbol=MSFT&token=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(indexBarSymbol);
        if (!response.ok) {
          throw new Error(`Error fetching stock data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setStockBar(jsonData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();

    const intervalId = setInterval(fetchStockData, 10000);

    return () => clearInterval(intervalId);
  }, []);



  return (
    <div>
      <p className='sym'>$MSFT <span className='price'>{stockBar.c}</span><br /><span className={stockBar.d > 0 ? 'positive' : 'negative'}>
      {stockBar.d > 0 ? '+' : '-'}{Math.abs(stockBar.d)} ({stockBar.dp > 0 ? '+' : '-'}{Math.abs(stockBar.dp)}%)
    </span></p>
    </div>
  )
}

export default Stock6;