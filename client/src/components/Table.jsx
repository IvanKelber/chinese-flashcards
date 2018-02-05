import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

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

  render(){
    var wordsJSON = this.state.words.map(function(word) {
        return {
            character: word[0],
            pinyin: word[1],
            definition: word[2],
            particle: word[3]
        }
    })
    return (
        <BootstrapTable data={wordsJSON} search >
            <TableHeaderColumn isKey dataField="character"> 汉字 </TableHeaderColumn>
            <TableHeaderColumn dataField="pinyin"> Pinyin </TableHeaderColumn>
            <TableHeaderColumn dataField="definition"> Definition </TableHeaderColumn>
            <TableHeaderColumn dataField="particle"> Particle </TableHeaderColumn>
        </BootstrapTable>
)
  }
}

export default Table;
