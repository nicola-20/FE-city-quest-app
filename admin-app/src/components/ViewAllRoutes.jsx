import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewAllRoutes extends Component {
  render() {
    return (
      <main>
        <h2>List of routes</h2>
        <ul>
          <li>Route 1</li>
          <li>Route 2</li>
        </ul>
      </main>
    );
  }
}

ViewAllRoutes.propTypes = {

};

export default ViewAllRoutes;