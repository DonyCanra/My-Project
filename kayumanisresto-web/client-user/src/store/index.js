import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import menuReducer from "./reducers/menuReducer";
import thunk from "redux-thunk";
import detailReducer from "./reducers/detailReducer";

const rootReducer = combineReducers({
  menus: menuReducer,
  detail: detailReducer
});

// middleware logger
const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

let store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
