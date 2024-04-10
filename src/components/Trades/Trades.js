import React, {useEffect, useState} from 'react';
import './Trades.css';
import SymbolSearch from './SymbolSearch/SymbolSearch';


const base = 'https://finnhub.io/api/v1';

const Trades = () => {

  const [quote, setQuote] = useState([])
  const [profile, setProfile] = useState([])
  const [compNews, setCompNews] = useState([])

  const [selectedSymbol, setSelectedSymbol] = useState('');

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
  };

  useEffect(() => {
    if (selectedSymbol) {
      const addQuote = `${base}/quote?symbol=${selectedSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  
      fetch(addQuote)
        .then(response => response.json())
        .then(json => {
          setQuote(json);
        })
        .catch(error => {
          console.error("Error fetching quote:", error);
        });
    }
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol) {
      const addCompPro = `${base}/stock/profile2?symbol=${selectedSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  
      fetch(addCompPro)
        .then(response => response.json())
        .then(json => {
          setProfile(json);
        })
        .catch(error => {
          console.error("Error fetching quote:", error);
        });
    }
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol) {
      const addCompNews = `${base}/company-news?symbol=${selectedSymbol}&from=2024-04-01&to=2030-01-01&token=${process.env.REACT_APP_API_KEY}`;
  
      fetch(addCompNews)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setCompNews(json);
        })
        .catch(error => {
          console.error("Error fetching quote:", error);
        });
    }
  }, [selectedSymbol]);
  


  return (
    <div className='Tradesbox'>
      <header className='InfoBar'>
        <SymbolSearch onSymbolSelect={handleSymbolSelect}/>

      </header>
      <section className='QuotePanel'>
      {/* <p>Quote for {selectedSymbol}</p> */}
        <p>Last price: {quote.c}</p>
        <p>Change: {quote.d}</p>
        <p>Percent change: {quote.dp}</p>
        <p>High: {quote.h}</p>
        <p>Low: {quote.l}</p>
        <p>Open: {quote.o}</p>
        <p>Prev Close: {quote.pc}</p>

      </section>
      <section className='CompProfile'>
        <img src={profile.logo}/>
        <p>Country: {profile.country}</p>
        <p>Currency: {profile.currency}</p>
        <p>Listed exchange: {profile.exchange}</p>
        <p>Market Cap: {profile.marketCapitalization}</p>
        <p>Name: {profile.name}</p>
        <p>Oustanding Shares: {profile.shareOutstanding}</p>
      </section>

      <section className='CompNews'>
        {compNews.map((list, index) => (
          <div key={index}>
        <p>{list.category}</p>
        <p>{list.headline}</p>
        <p>{list.summary}</p>
        </div>
        ))}
        
      </section>
    
    </div>
  )
}

export default Trades;