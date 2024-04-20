import PropTypes from "prop-types";
import { Component } from "react";
import { formatDay, getWeatherIcon } from "./helpers/helpers";

export default class Day extends Component {
  render() {
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

Day.propTypes = {
  date: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  code: PropTypes.number.isRequired,
  isToday: PropTypes.bool.isRequired,
};
