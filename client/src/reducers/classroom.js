import {
  GET_CLASSROOM,
  CLASSROOM_ERROR,
  CLEAR_CLASSROOM,
  UPDATE_CLASSROOM,
  GET_CLASSROOMS
} from '../actions/types';

const initialState = {
  classroom: null,
  classrooms: [],
  loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLASSROOM:
    case UPDATE_CLASSROOM:
      return {
        ...state,
        classroom: payload,
        loaded: true
      };

    case GET_CLASSROOMS:
      return {
        ...state,
        classrooms: payload,
        loaded: true
      };

    case CLASSROOM_ERROR:
      return {
        ...state,
        error: payload,
        loaded: true,
        classroom: null
      };

    case CLEAR_CLASSROOM:
      return {
        ...state,
        classroom: null,
        loaded: true,
        error: null
      };

    default:
      return state;
  }
}
