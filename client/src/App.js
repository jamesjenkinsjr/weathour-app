import React, { Component } from "react";
import { isArrayEmpty } from "./utilities.js";
import { parseDatetime } from "./utilities.js";
import { getWeather, getZipForWeather } from "./services/weather.js";
import { selection } from "./images";
import "./App.css";
import "./bootstrap.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipError: null,
      lat: "",
      long: "",
      zip: "",
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
    if (e) {
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
    this.setState({ isLoading: true });
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
      });
  }
  findLocation(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
      geoError: ""
    });
    var geoSuccess = success => {
      const geoLat = success.coords.latitude;
      const geoLong = success.coords.longitude;
      this.setState({
        lat: geoLat,
        long: geoLong,
        isLoading: false
      });
      this.handleSubmitCoordinates();
    };
    var geoFail = failure => {
      this.setState({
        isLoading: false,
        geoError: "Failed to fetch geolocation at this time!"
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
  }

  render() {
    return (
      <div className="container-custom container-fluid p-5">
        <div className="header">
          <h1 className="text-white">Hourly Weather</h1>
          <p className="text-white">
            Enter your lattitude and longitude, or use geolocation, below to
            retrieve an hourly outlook on weather in your area!
          </p>
        </div>
        <div className="forms">
          <div className="form-group">
            <form
              onSubmit={e => {
                this.handleSubmitCoordinates(e);
              }}
            >
              <div className="row">
                <div classname="col">
                  <input
                    className="form-control form-control-lg"
                    placeholder="latitude"
                    id="lat"
                    type="number"
                    value={this.state.lat}
                    onChange={e => this.handleLat(e)}
                  />
                </div>
                <div clasName="col">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Longitude"
                    id="long"
                    type="number"
                    value={this.state.long}
                    onChange={e => this.handleLong(e)}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Generate
                </button>
              </div>
            </form>
          </div>
          <div className="form-group">
            <form
              onSubmit={e => {
                this.handleSubmitZip(e);
              }}
            >
              <div className="row">
                
                  <input
                    className="form-control form-control-lg zip-width"
                    type="number"
                    min="00501"
                    max="99500"
                    placeholder="Zip Code"
                    value={this.state.zip}
                    onChange={e => {
                      this.handleZip(e);
                    }}
                  />
                
              
              <button className="btn btn-primary" type="submit">
                Generate
              </button>
              </div>
            </form>
          </div>
          <div className="form-group">
          <div className="row">
          <form
            onSubmit={e => {
              this.findLocation(e);
            }}
          >
            <button className="btn btn-primary" type="submit">
              Geolocate me!
            </button>
            
            {this.state.isLoading === true 
            ? <h3 className="text pt-3">Loading...</h3> 
            : ""}
            {this.state.geoError ? <h3>{this.state.geoError}</h3> : ""}
          </form>
          </div>
          </div>
        </div>
        {this.state.zipError || this.state.geoError
          ? alert("Weiners jumpin' jelly gigalos")
          : ""}
        {isArrayEmpty(this.state.hourlyWeather) ||
        this.state.isLoading === true ? (
          ""
        ) : (
          <div className="container-fluid">
            <h2 className="text-white text-align-center">Hourly Report!</h2>
            <div className="row report-row">
              {this.state.hourlyWeather.map((hour, index) => {
                return (
                  <div key={hour.time} className="col hour-cell mt-3 justify-content-center">
                    <h3 classname="text-white">{parseDatetime(hour.time)}</h3>
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
