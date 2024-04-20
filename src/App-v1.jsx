import { Component } from "react";
import { convertToFlag } from "./helpers/helpers";
import Weather from "./Weather";
import Input from "./Input";

export class App extends Component {
  // constructor(props) {
  //   super(props);
  //   //Since we can use the class field to initialize our state object and also use an arrow function that naturally uses the "this" keyword of it's parent element, this constructor function is not really necessary anymore
  //   console.log(this);
  // }

  state = {
    //Class field to initialize state object
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
    count: 0,
  };

  componentDidMount() {
    //Executed after a component has been painted on the screen.
    // similar to useEffect(()=>{},[])
    this.setState({ location: localStorage.getItem("location") || "" }); //On mount, set the location state to the one saved in the localStorage
  }

  componentDidUpdate(prevProps, prevState) {
    //Executed after a component has been painted due to a re-render due to an update to the state
    // similar to useEffect(()=>{},[dep1,dep2])
    if (this.state.location !== prevState.location) {
      //The only situation where the if expression is true is when the this.state.location has been changed/updated which is when we want the this.fetchWeather() to be called
      this.fetchWeather();

      //Store the location data to the localStorage
      localStorage.setItem("location", this.state.location);
    }
  }

  fetchWeather = async () => {
    // If input location characters is less than 2, don't bother fetching for data
    if (this.state.location.length < 2) return;
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      // console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      // console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      // console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => this.setState({ location: e.target.value });
  render() {
    return (
      <div className="app">
        <button
          onClick={() =>
            this.setState((curState) => {
              return { count: curState.count + 1 };
            })
          }
        >
          {this.state.count}
        </button>
        <h1>Class Weather</h1>
        <Input state={this.state.location} onSetLocation={this.setLocation} />
        {/* <button onClick={this.fetchWeather}>Get Weather</button> */}
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
