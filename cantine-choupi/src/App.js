import React from 'react';
import "./App_styles.scss";

import Navigation from './components/navigation/navigation';
import Landing from './pages/landing/landing';
import Products from './pages/products/products';
import Checkout from './pages/checkout/checkout';

import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorPage from './pages/errors/error';
import Login from './pages/login/login';

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
          <Route exact path="/checkout">
            <Navigation type="checkout" />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route>
            <ErrorPage code="404" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
