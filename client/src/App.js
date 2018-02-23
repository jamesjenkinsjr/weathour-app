import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      lat: 1,
      long: -1,
      zip: '',
      hourlyWeather: {},
      error: null
    }
    this.handleZip = this.handleZip.bind(this);
  }
  handleZip(e) {
    this.setState({
      zip: +e.target.value
    });
  }
  
  render() {
    return (
      <div>
        <div className="header">
          <h1>Hourly Weather</h1>
          <p>Enter your zip code below to retrieve an hourly outlook on weather in your area!</p>
        </div>
        <form>
          <label>Zip Code <input type="number" placeholder="ex. 90210" value={this.state.zip} onChange={(e) => {this.handleZip(e)}}/></label>
          <button type="submit">Generate</button>
        </form>
      </div>
    );
  }
}

export default App;
