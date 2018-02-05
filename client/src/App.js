import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from './components/Card.jsx'
import FlashBin from './components/FlashBin.jsx'
import './App.css';

class App extends Component {
  state = {
      words : [],
      numCards: 0
  };

  componentDidMount() {

  };


  render() {

    return (
        <FlashBin/>
    )

  }
}

export default App;
