import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './Table.css'


class Table extends Component {
  state = {
      words: []
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
  }

  createNewWordButton = (onClick) => {
    return (
      <Button bsStyle="success" onClick={this.handleNewWordClick}>New Word</Button>
    );
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
