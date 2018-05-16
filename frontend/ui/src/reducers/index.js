import { combineReducers } from "redux";
import PredictReducer from "./predictReducer";


const rootReducer = combineReducers({
  predict: PredictReducer
});

export default rootReducer;
