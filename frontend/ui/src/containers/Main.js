import React, { Component } from "react";
import "./Main.css";
import Grid from '../components/Gird';
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
    const weekday_is_friday = document.getElementById(' weekday_is_friday').value || 0;
    const data_channel_is_bus = document.getElementById(' data_channel_is_bus').value || 0
    const data_channel_is_tech = document.getElementById(' data_channel_is_tech').value || 0;
    const weekday_is_monday =  document.getElementById(' weekday_is_monday').value || 0;
    const weekday_is_wednesday = document.getElementById(' weekday_is_wednesday').value || 0;
    const weekday_is_thursday =  document.getElementById(' weekday_is_thursday').value || 0;
    const weekday_is_tuesday = document.getElementById(' weekday_is_tuesday').value || 0;
    const is_weekend = document.getElementById(' is_weekend').value || 0;
    const data_channel_is_world = document.getElementById(' data_channel_is_world').value || 0;
    const data_channel_is_entertainment = document.getElementById(' data_channel_is_entertainment').value || 0;
    const n_tokens_title = document.getElementById(' n_tokens_title').value || 0;
    const title_sentiment_polarity = document.getElementById(' title_sentiment_polarity').value || 0;
    const global_sentiment_polarity = document.getElementById(' global_sentiment_polarity').value || 0;
    const data_channel_is_socmed = document.getElementById(' data_channel_is_socmed').value || 0;
    
    this.props.postPrediction({
        content: {
            data_channel_is_socmed,
            data_channel_is_tech,
            data_channel_is_bus,
            data_channel_is_world,
            data_channel_is_entertainment,
            is_weekend,
            weekday_is_friday,
            weekday_is_monday,
            weekday_is_tuesday,
            weekday_is_wednesday,
            weekday_is_thursday,
            title_sentiment_polarity,
            n_tokens_title,
            global_sentiment_polarity
        }
    });
  }

  render() {
    const prediction = get(this.props, 'predict.payload');
    const categories = ['Few', 'Modest', 'Lot', 'Popular'];
    return (
        <div className="content">
            <Grid />
            <button onClick={() => this.post() }>Predict</button>
            <div className="results">
                {prediction ? prediction.response[0].map((pred, idx) => 
                    <div key={idx}><div className="label">{categories[idx]}:</div> {pred}</div>
                ) : 'Predictions will appear here...'}
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
