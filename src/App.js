import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import faker from "faker";
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import PoweredByGiphy from './PoweredByGiphy.png';

export default function App() {
  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('cat');
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = (value) => setQuery(value);

  useEffect(() => {
    const adj = faker.commerce.productAdjective();
    axios(`http://api.giphy.com/v1/gifs/search?q=${adj}%20${query}&limit=24&rating=g&api_key=dc6zaTOxFJmzC`)
      .then(response => setData(response.data.data))
      .catch(error => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">Gif Search</h1>
          <SearchForm onSearch={performSearch} />      
        </div>   
      </div>    
      <div className="main-content">
        {
          isLoading
          ? <p>Don't mind me, I'm just loading...</p>
          : <GifList data={data} />
        }
      </div>
      <div>
        <footer>
          <img className="footer" src={PoweredByGiphy} alt="Powered by Giphy" />
        </footer>
      </div>
    </div>
  );
}

