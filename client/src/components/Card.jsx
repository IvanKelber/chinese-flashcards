import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

class Card extends Component {
    
    state = {
        difficulty: 0
    };

    componentDidMount() {

    };

    render() {
        return(
            <Jumbotron>
                <h1>{this.props.character}</h1>
                <span>{this.props.pinyin}</span>
                <span>{this.props.definition}</span>
                <span>{this.props.particle}</span>
            </Jumbotron>

        );
    }
}

export default Card
