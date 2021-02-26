import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import PathFinder from './pages/PathFinder';

function App() {
  return (
    <div className="App">
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
