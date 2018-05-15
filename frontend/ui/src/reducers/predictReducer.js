import { POST_PREDICTION } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case POST_PREDICTION:
      return Object.assign({}, state, {
        payload: action.payload.data
      })  
  }
  return state;
}
