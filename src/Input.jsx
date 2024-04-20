import PropTypes from "prop-types";
import { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search from location..."
          value={this.props.location}
          onChange={this.props.onSetLocation}
        />
      </div>
    );
  }
}

Input.propTypes = {
  location: PropTypes.string,
  onSetLocation: PropTypes.func,
};
