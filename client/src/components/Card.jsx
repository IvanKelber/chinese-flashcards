import React, { Component } from 'react';

class Card extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
            difficulty: 0,
            word: [],
            visibleWord: []
    };

    componentDidMount() {
        if(this.props.word !== undefined) {
            this.setState({
                word: this.props.word
            });
        }

    };

    handleClick() {
        var newDifficulty = (this.state.difficulty + 1) % 4;
        this.setState({
            difficulty: newDifficulty,
            visibleWord: this.state.word.slice(1, newDifficulty + 1)
        });
    };

    render() {
        if(this.props.word === undefined) {
            return null;
        }
        var pinyinClass = this.state.difficulty >= 1 ? "visible" : "hidden";
        var particleClass = this.state.difficulty >= 2 ? "visible" : "hidden";
        var definitionClass = this.state.difficulty >= 3 ? "visible" : "hidden";

        return(
            <span className="Card" onClick={this.handleClick}>
                <h1>{this.state.word[0]}</h1>
                <p className={pinyinClass}>{this.state.word[1]}</p>
                <p className={particleClass}>{this.state.word[2]}</p>
                <p className={definitionClass}>{this.state.word[3]}</p>

            </span>

        );
    }
}

export default Card
