import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router'
import Header from './components/Header'
import Login from './components/Login'
import ViewAllRoutes from './components/ViewAllRoutes'
import ViewRoute from './components/ViewRoute'
import AddRoute from './components/AddRoute'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <Footer />
        <Router>
          <Login path="/" />
          <ViewAllRoutes path="routes" />
          <ViewRoute path="routes/:route_id" />
          <AddRoute path="routes/new" />
        </Router>
      </div>
    );
  }
}

export default App;
