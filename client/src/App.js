import React, { Component } from 'react';
import FlashBin from './components/FlashBin.jsx'
import Table from './components/Table.jsx'
import './App.css';

class App extends Component {

  render() {

    return (
        <div className='HorizontalBin'>
            <FlashBin />
            <Table />
        </div>
    )

  }
}

export default App;
