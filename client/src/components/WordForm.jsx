import React, { Component } from 'react';
import './FlashBin.css';

class WordForm extends Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
        // We bind this to the handle submit function so that we can reference this from
        // within handleSubmit
  }

  state = {
    character: '',
    definition: '',
    particle: '',
  };

  handleSubmit = (event) => {
      event.preventDefault();
      var data = JSON.stringify({
          character: this.state.character,
          definition: this.state.definition,
          particle: this.state.particle
      });

      var clearInputs = () => {
          this.setState({
              character: '',
              definition: '',
              particle: ''
          });
      }

      var refresh = (resp) => {
          this.props.refreshTable();
      }


      fetch('/check', {
          method: 'POST',
          body: data,
          headers: {"Content-Type": "application/json"}
      }).then(function(resp) {
          if(resp.status === 200) {
                fetch('/createWord', {
                  method: 'POST',
                  body: data,
                  headers: {"Content-Type": "application/json"}
              }).then(refresh);
          } else {
              console.log("That character already exists!!");
          }
          clearInputs();
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
