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
    this.state = {
        value: '0'
    }

    this.post = this.post.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  post() {
    let data = null;
    const data_channel_is_lifestyle = document.getElementById(' data_channel_is_lifestyle').value || 0;
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

    if(+this.state.value === 0) {
        const bin_d = {
            binary: +this.state.value === 0 ? true : false,
            data: {
                data_channel_is_lifestyle,
                weekday_is_friday,
                data_channel_is_bus,
                data_channel_is_tech,
                weekday_is_monday,
                weekday_is_wednesday,
                weekday_is_thursday,
                weekday_is_tuesday,
                is_weekend,
                data_channel_is_world,
                data_channel_is_entertainment,
                n_tokens_title,
                title_sentiment_polarity,
                global_sentiment_polarity
            }
        }
        data = bin_d;
    }

    if(+this.state.value === 1) {
        const weekday_is_sunday =  document.getElementById(' weekday_is_sunday').value || 0;
        const weekday_is_saturday =  document.getElementById(' weekday_is_saturday').value || 0;
        const data_channel_is_socmed = document.getElementById(' data_channel_is_socmed').value || 0;
        const mul_d = {
            binary: +this.state.value === 1 ? false : true,
            data: {
                weekday_is_sunday,
                weekday_is_saturday,
                data_channel_is_lifestyle,
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
        data = mul_d;
    } 
    this.props.postPrediction(data);
  }

  render() {
    const prediction = get(this.props, 'predict.payload');

    return (
        <div className="content">
            <Grid type={this.state.value}/>
            <select className="select" id="select" value={this.state.value} onChange={this.handleChange}>
                <option value="0">Binary</option>
                <option value="1">Multi</option>
            </select>
            <button onClick={() => this.post() }>Predict</button>
            <div className="results">
                {prediction ? prediction.response[0].map((pred, idx) => 
                    <div key={idx}>{pred}</div>
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
