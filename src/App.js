import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import PathFinder from './pages/PathFinder';
import Navbar from 'components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pathfinder" component={PathFinder} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
