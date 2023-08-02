import { MENUS_DETAIL_SUCCESS } from "../actions/actionTypes";

const inisialState = { menu: [] };

function detailReducer(state = inisialState, action) {
  switch (action.type) {
    case MENUS_DETAIL_SUCCESS:
      return {
        ...state,
        menu: action.payload,
      };

    default:
      return state;
  }
}

export default detailReducer;
