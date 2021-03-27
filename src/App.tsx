import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark justify-content-center fixed-top'>
          <Link to={"/"} className='navbar-brand'>
            <p className="main-text">Palace</p>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
