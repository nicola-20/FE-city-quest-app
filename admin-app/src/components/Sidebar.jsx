import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router'
import './css/Sidebar.css'

const Sidebar = props => {
  return (
    <nav>
      <Link to="/routes">View All Routes</Link>
      <Link to="/routes/new">Add New Route</Link>
      <span>Logged in as "user"</span>
      <button>Log out</button>
    </nav>
  );
};

Sidebar.propTypes = {
  
};

export default Sidebar;