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
      console.log(json)
    setNewsList(json);
    }).catch(error => {
      console.error("Error fetching search results:", error);
    });

  }, [])

  return (
    <div className='NewsBox'>
      {newsList.map((list, index) => (
        <p key={index}>lis  {list.category}</p>
      ))}

    </div>
  )
}

export default News;