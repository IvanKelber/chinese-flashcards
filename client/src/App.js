import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from './components/Card.jsx'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      response: ''
  };

  componentDidMount() {
      this.callApi()
        .then(res => this.setState({response: res.flash}))
        .catch(err => console.log(err));
  };

  callApi = async() => {
      const response = await fetch('/flash');
      const body = await response.json();

      if(response.status !== 200) {
          throw Error(body.message);
      }

      return body;
  };

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <body>
            <Button bsStyle="primary">Flash</Button>
            <p className="App-intro">

            {this.state.response}
            </p>
            <Card character="你好" pinyin="ni3hao3" definition='hello' particle="other"/>
        </body>
      </div>
    );
  }
}

export default App;
