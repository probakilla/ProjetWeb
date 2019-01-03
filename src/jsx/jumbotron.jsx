import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReturnToIndexButton } from "./button";

class Message extends Component {
    static get propTypes() {
        return {
            header: PropTypes.string,
            text: PropTypes.string
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            header: props.header,
            text: props.text,
            redirectText: "Cliquez pour revelir à l'accueil"
        };
    }
    
    render() {
        return(
            <div className="jumbotron">
                <h2 className="display-4">{this.state.header}</h2>
                <p className="lead">{this.state.text}</p>
                <hr className="my-4" />
                <p>{this.state.redirectText}</p>
                <ReturnToIndexButton />
            </div>
        );
    }
}

export default Message;