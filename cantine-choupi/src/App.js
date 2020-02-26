import React from 'react';
import "./App_styles.scss";

import Landing from './pages/landing/landing';
import Navigation from './components/navigation/navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Landing />
    </div>
  );
}

export default App;
