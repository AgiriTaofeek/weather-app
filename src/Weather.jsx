import { Component } from "react";
import PropTypes from "prop-types";
import Day from "./Day";

export class Weather extends Component {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;
    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
};
export default Weather;
