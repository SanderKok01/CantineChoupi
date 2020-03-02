import React from 'react';
import "./App_styles.scss";

import Landing from './pages/landing/landing';
import Navigation from './components/navigation/navigation';
import Products from './pages/products/products';

import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Navigation type="landing" />
            <Landing />
          </Route>
          <Route exact path="/products">
            <Navigation type="products" />
            <Products />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
