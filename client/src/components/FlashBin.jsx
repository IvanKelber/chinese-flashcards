import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card.jsx'
import './FlashBin.css';

class FlashBin extends Component {

  constructor() {
      super();
      this.handleRefreshWords = this.handleRefreshWords.bind(this);
      // We bind this to the handle submit function so that we can reference this from
      // within handleSubmit
  }

  state = {
      words : [],
      numCards: 0
  };

  componentDidMount() {
      this.handleRefreshWords();
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

  handleRefreshWords() {
      this.callApi()
        .then(res => this.setState({
            words: res,
            numCards: res.length
        }))
        .catch(err => console.log(err));
  };

  render() {


    return (
    <div>
      <div className="FlashBin">
            {this.state.words.map(function(word, index) {
                return  <Card word={ word } key= { index }/>
            })}

      </div>
      <Button bsStyle="primary" onClick={this.handleRefreshWords}>Flash!</Button>

     </div>
    );
  }
}

export default FlashBin;
