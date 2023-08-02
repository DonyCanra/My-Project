import { MENUS_FETCH_SUCCESS, MENUS_DETAIL_SUCCESS } from "./actionTypes";

export const menusFetchSuccess = (data) => {
  return {
    type: MENUS_FETCH_SUCCESS,
    payload: data,
  };
};
export const menusDetailSuccess = (data) => {
  return {
    type: MENUS_DETAIL_SUCCESS,
    payload: data,
  };
};

