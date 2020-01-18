import {
  GET_STUDENTS,
  STUDENTS_ERROR,
  CLEAR_STUDENTS,
  UPDATE_STUDENT
} from '../actions/types';

const initialState = {
  student: null,
  students: [],
  loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STUDENTS:
    case UPDATE_STUDENT:
      return {
        ...state,
        student: payload,
        loaded: true
      };

    case STUDENTS_ERROR:
      return {
        ...state,
        error: payload,
        loaded: true,
        student: null
      };

    case CLEAR_STUDENTS:
      return {
        ...state,
        student: null,
        loaded: true,
        error: null
      };

    default:
      return state;
  }
}
