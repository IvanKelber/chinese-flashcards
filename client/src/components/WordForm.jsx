import React, { Component } from 'react';
import './FlashBin.css';

class WordForm extends Component {

  state = {
    character: '',
    definition: '',
    particle: ''
  };

  callApi = async() => {
      const response = await fetch('/createWord');
      const body = await response.json();
      console.log(response);
      if(response.status !== 200) {
          throw Error(body.message);
      }

      return body;
  };

  handleSubmit = (event) => {
      event.preventDefault();
      var data = JSON.stringify({
          character: this.state.character,
          definition: this.state.definition,
          particle: this.state.particle
      });
      console.log(data);
      fetch('/createWord', {
        method: 'POST',
        body: data,
        headers: {"Content-Type": "application/json"}
    }).then(function(resp) {
        console.log(resp);
    });
  };

  handleChangeCharacter = (event) => {
      this.setState({character: event.target.value})
  };

  handleChangeDefinition = (event) => {
      this.setState({definition: event.target.value})
  };

  handleChangeParticle = (event) => {
      this.setState({particle: event.target.value})
  };

  render() {


    return (
      <form >
        <label>
            Chinese Character (汉字):
            <input type="text" name="character" placeholder="汉子" value={this.state.character} onChange={this.handleChangeCharacter}/>
        </label>
        <label>
            Definition:
            <input type="text" name="definition" placeholder="definition" value={this.state.definition} onChange={this.handleChangeDefinition}/>
        </label>
        <label>
            Particle:
            <input type="text" name="particle" placeholder="particle" value={this.state.particle} onChange={this.handleChangeParticle}/>
        </label>
        <button type="button" onClick={this.handleSubmit}>Add New Word!</button>
      </form>
    );
  }
}

export default WordForm;
