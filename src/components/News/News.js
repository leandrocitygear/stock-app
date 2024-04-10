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
      {newsList.map((list, index) => (
        <div key={index}>
        <p>{list.category}</p>
        <p>{list.datetime}</p>
        <p>{list.headline}</p>
        <img className='newsimg' src={list.image}/>
        <p>{list.related}</p>
        <p>{list.source}</p>
        <p>{list.summary}</p>
        <p>{list.url}</p>
        </div>
      ))}

    </div>
  )
}

export default News;