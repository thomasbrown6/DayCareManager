import {
  GET_DAYCARE,
  DAYCARE_ERROR,
  CLEAR_DAYCARE,
  UPDATE_DAYCARE,
  GET_DAYCARES
} from '../actions/types';

const initialState = {
  daycare: null,
  daycares: [],
  loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DAYCARE:
    case UPDATE_DAYCARE:
      return {
        ...state,
        daycare: payload,
        loaded: true
      };

    case GET_DAYCARES:
      return {
        ...state,
        daycares: payload,
        daycare: payload[0],
        loaded: true
      };

    case DAYCARE_ERROR:
      return {
        ...state,
        error: payload,
        loaded: true,
        daycare: null
      };

    case CLEAR_DAYCARE:
      return {
        ...state,
        daycare: null,
        loaded: true,
        error: null
      };

    default:
      return state;
  }
}
