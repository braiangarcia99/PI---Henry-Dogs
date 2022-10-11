import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import DogDetails from './components/DogDetails';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/home/:id' component={DogDetails} />
      <Route path='/creation' component={CreateDog} />
    </div>
  );
}

export default App;
