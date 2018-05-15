import axios from "axios";
import { merge } from "lodash";
export const POST_PREDICTION = "POST_PREDICTION";


const headers = {
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
}

export function postPrediction(data) {
  const params = merge(headers, data);
  const request = axios.post('http://ec2-52-57-163-24.eu-central-1.compute.amazonaws.com/predict', params);

  return {
    type: POST_PREDICTION,
    payload: request
  };
}
