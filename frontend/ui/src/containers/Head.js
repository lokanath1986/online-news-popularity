import React, { Component } from "react";
import "./Head.css";


class Head extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <header>
            <h1>Predict online news popularity</h1>
        </header>
    );
  }
}

export default Head;