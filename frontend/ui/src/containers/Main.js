import React, { Component } from "react";
import "./Main.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postPrediction } from "../actions/index";
import { get } from 'lodash';


class Main extends Component {
  constructor(props) {
    super(props);
    this.post = this.post.bind(this);
  }

  post() {
    const data_channel_is_socmed = document.getElementById('data_channel_is_scomed').value || 0;
    const data_channel_is_tech = document.getElementById('data_channel_is_tech').value || 0;
    const data_channel_is_bus = document.getElementById('data_channel_is_bus').value || 0;
    const data_channel_is_world = document.getElementById('data_channel_is_world').value || 0;
    const data_channel_is_entertainment = document.getElementById('data_channel_is_entertainment'.value) || 0;
    const is_weekend = document.getElementById('is_weekend').value || 0;
    const weekday_is_friday = document.getElementById('weekday_is_friday').value || 0;
    const weekday_is_monday = document.getElementById('weekday_is_monday'.value) || 0;
    const weekday_is_tuesday = document.getElementById('weekday_is_tuesday').value || 0;
    const weekday_is_thursday = document.getElementById('weekday_is_thursday').value || 0;
    const weekday_is_wednesday = document.getElementById('weekday_is_wednesday').value || 0;
    const title_sentiment_polarity = document.getElementById('title_sentiment_polarity').value || 0;
    const n_tokens_title = document.getElementById('n_tokens_title').value || 0;
    const global_sentiment_polarity = document.getElementById('global_sentiment_polarity').value || 0;

    var select = document.getElementById("select");
    var val = select.options[select.selectedIndex].value;

    const d = {
        binary: val === 0 ? true : false,
        data: {
            data_channel_is_socmed,
            data_channel_is_tech,
            data_channel_is_bus,
            data_channel_is_world,
            data_channel_is_entertainment,
            is_weekend,
            weekday_is_friday,
            weekday_is_monday,
            weekday_is_tuesday,
            weekday_is_thursday,
            weekday_is_wednesday,
            title_sentiment_polarity,
            n_tokens_title,
            global_sentiment_polarity
        }
    }

    this.props.postPrediction(d);
  }

  render() {
    const prediction = get(this.props, 'midgress.predict');

    return (
        <div className="content">
            <div className="grid">
                <div className="input-box">
                    <input type="text" id="data_channel_is_scomed" placeholder="data_channel_is_socmed" />
                </div>
                <div className="input-box">
                    <input type="text" id="data_channel_is_tech" placeholder="data_channel_is_tech"/>
                </div>
                <div className="input-box">
                    <input type="text" id="data_channel_is_bus" placeholder="data_channel_is_bus"/>
                </div>
                <div className="input-box">
                    <input type="text" id="data_channel_is_world" placeholder="data_channel_is_world"/>
                </div>
                <div className="input-box">
                    <input type="text" id="data_channel_is_entertainment" placeholder="data_channel_is_entertainment"/>
                </div>
                <div className="input-box">
                    <input type="text" id="is_weekend" placeholder="is_weekend"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="weekday_is_friday" placeholder="weekday_is_friday"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="weekday_is_monday" placeholder="weekday_is_monday"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="weekday_is_tuesday" placeholder="weekday_is_tuesday"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="weekday_is_thursday" placeholder="weekday_is_thursday"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="weekday_is_wednesday" placeholder="weekday_is_wednesday"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="title_sentiment_polarity" placeholder="title_sentiment_polarity"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="n_tokens_title" placeholder="n_tokens_title"/>
                </div>
                <div className="input-box">
                    <input type="text"  id="global_sentiment_polarity" placeholder="global_sentiment_polarity"/>
                </div>
            </div>
            <select className="select" id="select">
                <option value="0">Binary</option>
                <option value="1" selected>Multi</option>
            </select>
            <button onClick={() => this.post() }>Predict</button>
            <div className="results">
                {prediction ? prediction : 'Predictions will appear here...'}
            </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postPrediction }, dispatch);
  }
  
  function mapStateToProps({ predict }) {
    return { predict };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Main);
