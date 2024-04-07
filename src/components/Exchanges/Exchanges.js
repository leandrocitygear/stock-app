import React from 'react';
import './Exchanges.css';
import Stock1 from './StockBar/Stock1';
import Stock2 from './StockBar/Stock2';
import Stock3 from './StockBar/Stock3';
import Stock4 from './StockBar/Stock4';
import Stock5 from './StockBar/Stock5';
import Stock6 from './StockBar/Stock6';



const Exchanges = () => {


  return (
    <div className='Exchanges'>
      <Stock1/>
      <Stock2/>
      <Stock3/>
      <Stock4/>
      <Stock5/>
      <Stock6/>
      
    </div>
  )
}

export default Exchanges;