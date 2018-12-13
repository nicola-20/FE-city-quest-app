import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewRoute extends Component {
  render() {
    return (
      <main>
        <h2>Route 1</h2>
        <h3>List of locations:</h3>
        <ul>
          <li>
            Location 1
          </li>
          <li>
            Location 2
          </li>
        </ul>
      </main>
    );
  }
}

ViewRoute.propTypes = {

};

export default ViewRoute;