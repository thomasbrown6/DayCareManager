import {
  GET_CLASSROOM,
  CLASSROOM_ERROR,
  DELETE_CLASSROOM,
  UPDATE_CLASSROOM,
  GET_CLASSROOMS,
  CLEAR_CLASSROOMS
} from "../actions/types";

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
        classrooms: payload,
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
        classroom: null,
        classrooms: null
      };

    case CLEAR_CLASSROOMS:
    case DELETE_CLASSROOM:
      return {
        ...state,
        classroom: null,
        classrooms: null,
        loaded: true,
        error: null
      };

    default:
      return state;
  }
}
