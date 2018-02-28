import React, { Component } from "react";
import { isArrayEmpty } from "./utilities.js";
import { parseDatetime } from "./utilities.js";
import { getWeather, getZipForWeather } from "./services/weather.js";
import { selection } from "./images";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipError: null,
      lat: '',
      long: '',
      zip: '',
      hourlyWeather: [],
      geoError: null,
      isLoading: false
    };
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmitCoordinates = this.handleSubmitCoordinates.bind(this);
    this.handleSubmitZip = this.handleSubmitZip.bind(this);
    this.handleLat = this.handleLat.bind(this);
    this.handleLong = this.handleLong.bind(this);
    this.findLocation = this.findLocation.bind(this);
  }
  handleZip(e) {
    if((e.target.value < 10000) && (e.target.value > 999)){
     e.target.value = '0' + e.target.value;
    } else if (e.target.value <= 999) {
      e.target.value = '00' + e.target.value;
    }
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

  handleSubmitCoordinates(e = null) {
   if(e) {
     e.preventDefault();
   }
    getWeather(this.state.lat, this.state.long)
      .then(response => {
        const hourlyWeather = response.data.hourly.data;
        console.log(hourlyWeather);
        this.setState({ hourlyWeather: hourlyWeather });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "Something is awry"
        });
      });
  }

  handleSubmitZip(e) {
    e.preventDefault();
    this.setState({isLoading: true});
    getZipForWeather(this.state.zip)
      .then(response => {
        const zipLat = response.data.results[0].geometry.location.lat;
        const zipLong = response.data.results[0].geometry.location.lng;
        this.setState({
          lat: zipLat,
          long: zipLong,
          isLoading: false
        });
        this.handleSubmitCoordinates();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          zipError: "Something is awry"
        });
      })
    }
  findLocation(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
      geoError: ''
    });
    var geoSuccess = (success) => {
      const geoLat = success.coords.latitude;
      const geoLong = success.coords.longitude;  
      this.setState({
        lat: geoLat,
        long: geoLong,
        isLoading: false
      });
      this.handleSubmitCoordinates();
    };
    var geoFail = (failure) => {
      this.setState({
        isLoading: false,
        geoError: 'Failed to fetch geolocation at this time!'
      });
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);

}
  

  render() {
    return (
      <div>
        <div className="header">
          <h1>Hourly Weather</h1>
          <p>
            Enter your lattitude and longitude, or use geolocation, below to
            retrieve an hourly outlook on weather in your area!
          </p>
        </div>
        <div className="forms">
        <form
          onSubmit={e => {
            this.findLocation(e);
          }}
        >
          <button type="submit">Geolocate me!</button>
          {this.state.isLoading === true ? <p>Loading...</p> : '' }
          {this.state.geoError ? <p>{this.state.geoError}</p> : ''}  
        </form>
        <form
          onSubmit={e => {
            this.handleSubmitCoordinates(e);
          }}
        >
          <label>
            Latitiude{" "}
            <input
              id="lat"
              type="number"
              value={this.state.lat}
              onChange={e => this.handleLat(e)}
            />
          </label>
          <label>
            Longitude{" "}
            <input
              id="long"
              type="number"
              value={this.state.long}
              onChange={e => this.handleLong(e)}
            />
          </label>
          <button type="submit">Generate</button>
        </form>
        <form
          onSubmit={e => {
            this.handleSubmitZip(e);
          }}
        >
          <label>
            Zip Code{" "}
            <input
              type="number"
              min="00501"
              max="99500"
              placeholder="ex. 90210"
              value={this.state.zip}
              onChange={e => {
                this.handleZip(e);
              }}
            />
          </label>
          <button type="submit">Generate</button>
        </form>
        </div>
        {(this.state.zipError || this.state.geoError) ?  alert("Weiners jumpin' jelly gigalos") : ""}
        {(isArrayEmpty(this.state.hourlyWeather) || this.state.isLoading === true) ? (
          ""
        ) : (
          <div>
            <h2>Hourly Report!</h2>
            <div className="container">
              {this.state.hourlyWeather.map((hour, index) => {
                return (
                  <div key={hour.time} className="hour-cell">
                    <h3>{parseDatetime(hour.time)}</h3>
                    <br />
                    <img
                      src={selection(hour.icon)}
                      alt="hour.icon"
                      className="icon"
                    />
                    <br />
                    {hour.summary}
                    <br />
                    {Math.round(hour.temperature) + "˙F"}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
