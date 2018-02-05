import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from './Card.jsx'
import './FlashBin.css';

class FlashBin extends Component {
  state = {
      words : [],
      numCards: 0
  };

  componentDidMount() {
      this.callApi()
        .then(res => this.setState({
            words: res,
            numCards: res.length
        }))
        .catch(err => console.log(err));
  };

  callApi = async() => {
      const response = await fetch('/flash');
      const body = await response.json();
      console.log(response);
      if(response.status !== 200) {
          throw Error(body.message);
      }

      return body;
  };

  render() {

    return (
      <div className="FlashBin">
            <Button bsStyle="primary" onClick={this.callApi}>Flash</Button>
            {this.state.words.map(function(word, index) {
                return  <Card word={ word } key= { index }/>
            })}

      </div>
    );
  }
}

export default FlashBin;
