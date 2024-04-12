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
          const newsWithFormattedDate = json.map(news => ({
            ...news,
            datetime: new Date(news.datetime * 1000).toLocaleString()
          }));
          setCompNews(newsWithFormattedDate);
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
        <p className='tradeInfo'>Last Price: <span className='blueText'>{quote.c}</span></p>
        <p className='tradeInfo'>Change: <span className='blueText'>{quote.d}</span></p>
        <p className='tradeInfo'>Percent Change: <span className='blueText'>{quote.dp}</span></p>
        <p className='tradeInfo'>High: <span className='blueText'>{quote.h}</span></p>
        <p className='tradeInfo'>Low: <span className='blueText'>{quote.l}</span></p>
        <p className='tradeInfo'>Open: <span className='blueText'>{quote.o}</span></p>
        <p className='tradeInfo'>Prev Close: <span className='blueText'>{quote.pc}</span></p>

      </section>
      <section className='CompProfile'>
        {profile.logo && <img className='propic' src={profile.logo} alt="Company Logo" />}
        <p className='tradeInfo'>Country: {profile.country}</p>
        <p className='tradeInfo'>Currency: {profile.currency}</p>
        <p className='tradeInfo'>Listed exchange: {profile.exchange}</p>
        <p className='tradeInfo'>Market Cap: <span className='blueText'>{profile.marketCapitalization}</span></p>
        <p className='tradeInfo'>Name: {profile.name}</p>
        <p className='tradeInfo'>Oustanding Shares: <span className='blueText'>{profile.shareOutstanding}</span></p>
      </section>
      
      <section className='CompNews'>
        <h4>Company News</h4>
        {compNews.map((list, index) => (
          <div className='articleC' key={index}>
        <p>{list.datetime}</p><br/>
        <p>{list.headline}</p><br/>
        <p>{list.summary}</p><br/>
        {list.image && <img className='newsimg' src={list.image} alt="News Image" />}
        <p>Source: {list.source}</p>
        </div>
        ))}
      </section>
    
    </div>
  )
}

export default Trades;