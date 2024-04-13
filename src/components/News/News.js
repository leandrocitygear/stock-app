import React, {useEffect, useState} from 'react';
import './News.css';

const base = 'https://finnhub.io/api/v1';

const News = () => {

  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    const newsApi = `${base}/news?category=general&token=${process.env.REACT_APP_API_KEY}`;

    fetch(newsApi)
    .then(response => response.json())
    .then(json => {
      const newsWithFormattedDate = json.map(news => ({
          ...news,
          datetime: new Date(news.datetime * 1000).toLocaleString()
        }));
        setNewsList(newsWithFormattedDate);

    }).catch(error => {
      console.error("Error fetching search results:", error);
    });

  }, [])

  return (
    <div className='NewsBox'>
      <header className='MNews'>
        <h3 className='newsT'>Market News</h3>
      </header>
      {newsList.map((list, index) => (
        <div className='article' key={index}>
        <p>Category: {list.category}</p>
        <p>{list.datetime}</p><br/>
        <p>{list.headline}</p><br/>
        <p>{list.summary}</p><br/>
        {list.image && <img className='newsimg' src={list.image} alt="News Image" />}
        <p>{list.related}</p>
        <p>Source: {list.source}</p>
        <p>{list.url}</p>
        </div>
      ))}
    </div>
  )
}

export default News;