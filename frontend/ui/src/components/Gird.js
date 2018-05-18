import React, { Component } from "react";
import { fields } from "../assets/AllowedFields"
import "./Grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="grid">
            {fields.map((label, idx) => {
                return (<div className="input-box" key={idx}>
                    <input type="text" id={label} placeholder={label} />
                </div>)
            })}
        </div>
    );
  }
}

export default Grid;