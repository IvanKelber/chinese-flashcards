import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Modal from "react-overlays/lib/Modal";
import WordForm from './WordForm.jsx';

//Import CSS
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './Table.css';


const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: 'lightblue',
  opacity: 0.5
};

const dialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50
  let left = 50

  return {
    position: 'absolute',
    width: '500px',
    height: '400px',
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};

class Table extends Component {
  state = {
      words: [],
      modal_open: false
  };

  componentDidMount() {
      this.callApi()
        .then(res => this.setState({
            words: res
        }))
        .catch(err => console.log(err));
  };

  callApi = async() => {
      const response = await fetch('/table');
      const body = await response.json();
      console.log(response);
      if(response.status !== 200) {
          throw Error(body.message);
      }

      return body;
  };
  handleNewWordClick = (onClick) =>{
      console.log('clicked');
      console.log(onClick);
      this.setState({
          modal_open: true
      })
  }

  createNewWordButton = (onClick) => {
    return (
      <Button bsStyle="success" onClick={this.handleNewWordClick}>New Word</Button>
    );
  }

  closeModal = () => {
      this.setState({
          modal_open: false
      })
  }

  render(){
    var wordsJSON = this.state.words.map(function(word) {
        return {
            character: word[0],
            pinyin: word[1],
            definition: word[2],
            particle: word[3]
        }
    });

    const options = {
        insertBtn: this.createNewWordButton
    }

    return (
        <div className="TableContainer">
            <Modal
              style={modalStyle}
              backdropStyle={backdropStyle}
              autoFocus={false}
              show={this.state.modal_open}
              onHide={this.closeModal}>
              <div style={dialogStyle()}>
                  <WordForm />
              </div>
            </Modal>
            <BootstrapTable data={wordsJSON} options={options}
                search striped insertRow maxHeight='400px'>
                <TableHeaderColumn isKey dataField="character"> 汉字 </TableHeaderColumn>
                <TableHeaderColumn dataField="pinyin"> Pinyin </TableHeaderColumn>
                <TableHeaderColumn dataField="definition"> Definition </TableHeaderColumn>
                <TableHeaderColumn dataField="particle"> Particle </TableHeaderColumn>
            </BootstrapTable>
        </div>
)
  }
}

export default Table;
