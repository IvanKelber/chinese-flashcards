import React, { Component } from 'react';

class Card extends Component {

    initialState() {
        return({
            character: "",
            pinyin: "",
            definition: "",
            particle: "",
            difficulty: 0
        });
    };


    componentDidMount() {
        if(this.props.word !== undefined) {
            this.setState({
                character: this.props.word[0],
                pinyin: this.props.word[1],
                definition: this.props.word[2],
                particle: this.props.word[3],
            });
        }

    };



    render() {
        if(this.props.word === undefined) {
            return null;
        }
        return(
            <div className="Card">
                <h1>{this.props.word[0]}</h1>
                <p>{this.props.word[1]}</p>
                <p>{this.props.word[2]}</p>
                <p>{this.props.word[3]}</p>
            </div>

        );
    }
}

export default Card
