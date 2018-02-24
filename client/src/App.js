import React, { Component } from 'react';
import { isObjectEmpty } from './utilities.js';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      lat: 1,
      long: 1,
      zip: '',
      hourlyWeather: {},
      error: null
    }
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmitCoordinates = this.handleSubmitCoordinates.bind(this);
    this.handleSubmitZip = this.handleSubmitZip.bind(this);
    this.handleLat = this.handleLat.bind(this);
    this.handleLong = this.handleLong.bind(this);
  }
  handleZip(e) {
    this.setState({
      zip: +e.target.value
    });
  }
  handleLat(e) {
    this.setState({
      lat: +e.target.value
    });
  }
  handleLong(e) {
    this.setState({
      long: +e.target.value
    });
  }

  handleSubmitCoordinates(e) {
    e.preventDefault();
    const weather = this.state.hourlyWeather + 1;
    this.setState({
      hourlyWeather: weather
    });
    alert('eventually latitude and longitude');
  }

  handleSubmitZip(e) {
    e.preventDefault();
    const weather = this.state.hourlyWeather + 1;

    this.setState({
      hourlyWeather: weather
    });
    alert('eventually zip results');
  }
  
  render() {
    return (
      <div>
        <div className="header">
          <h1>Hourly Weather</h1>
          <p>Enter your lattitude and longitude, or zip code, below to retrieve an hourly outlook on weather in your area!</p>
        </div>
        <form onSubmit={(e) => {this.handleSubmitCoordinates(e)}}>
          <label>Latitiude <input type="number" value={this.state.lat} onChange={(e) => this.handleLat(e)}/></label>
          <label>Longitude <input type="number" value={this.state.long} onChange={(e) => this.handleLong(e)}/></label>
          <button type="submit">Generate</button>
        </form>
        <form onSubmit={(e) => {this.handleSubmitZip(e)}}>
          <label>Zip Code <input type="number" placeholder="ex. 90210" value={this.state.zip} onChange={(e) => {this.handleZip(e)}}/></label>
          <button type="submit">Generate</button>
        </form>
        {this.state.error ? 'Weiners' : ''}
        {isObjectEmpty(this.state.hourlyWeather) ? 'Weather object is empty right now' : <p>Hunka Hunka burnin' love</p> }
      </div>
    );
  }
}

export default App;
