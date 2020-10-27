import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import faker from "faker";
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import PoweredByGiphy from './PoweredByGiphy.png';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = "cat") => {
    const adj = faker.commerce.productAdjective();
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${adj}%20${query}&limit=24&rating=g&api_key=dc6zaTOxFJmzC`)
      .then(response => {
          this.setState({
            gifs: response.data.data,
            loading: false
          })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">Gif Search</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ? <p>Don't mind me, I'm just loading...</p>
          : <GifList data={this.state.gifs} />
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
}
