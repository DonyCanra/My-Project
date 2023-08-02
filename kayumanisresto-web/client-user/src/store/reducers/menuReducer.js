import { MENUS_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { menus: [] };

function menuReducer(state = inisialState, action) {
  switch (action.type) {
    case MENUS_FETCH_SUCCESS:
      return {
        ...state,
        menus: action.payload,
      };

    default:
      return state;
  }
}

export default menuReducer;
