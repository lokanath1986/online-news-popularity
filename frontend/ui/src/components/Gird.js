import React, { Component } from "react";
import "./Grid.css";

const fields = [[' data_channel_is_lifestyle', ' weekday_is_friday', ' data_channel_is_bus', ' data_channel_is_tech', ' weekday_is_monday', ' weekday_is_wednesday', ' weekday_is_thursday', ' weekday_is_tuesday', ' is_weekend', ' data_channel_is_world', ' data_channel_is_entertainment', ' n_tokens_title', ' title_sentiment_polarity', ' global_sentiment_polarity'],
[' weekday_is_sunday', ' weekday_is_saturday', ' data_channel_is_lifestyle', ' data_channel_is_socmed',' data_channel_is_tech', ' data_channel_is_bus', ' data_channel_is_world', ' data_channel_is_entertainment', ' is_weekend', ' weekday_is_friday', ' weekday_is_monday', ' weekday_is_tuesday', ' weekday_is_thursday', ' weekday_is_wednesday', ' title_sentiment_polarity', ' n_tokens_title', ' global_sentiment_polarity']];

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = +this.props.type;
    return (
        <div className="grid">
            {fields[type].map((label, idx) => {
                return (<div className="input-box" key={idx}>
                    <input type="text" id={label} placeholder={label} />
                </div>)
            })}
        </div>
    );
  }
}

export default Grid;