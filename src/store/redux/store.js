import { createStore } from 'redux';
import { API_ENDPOINT } from '../../services/api/api';

const initialState = {
  user: []
};

const SET_API_DATA = API_ENDPOINT;

export const setApiData = (payload) => ({
  type: SET_API_DATA,
  payload
});

function apiDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(apiDataReducer);

export default store;