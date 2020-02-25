import {
  GET_STUDENTS,
  STUDENTS_ERROR,
  CLEAR_STUDENTS,
  UPDATE_STUDENT
} from "../actions/types";

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
        students: payload,
        loaded: true
      };

    case STUDENTS_ERROR:
      return {
        ...state,
        students: null,
        error: payload,
        loaded: true
      };

    case CLEAR_STUDENTS:
      return {
        ...state,
        students: null,
        loaded: true,
        error: null
      };

    default:
      return state;
  }
}
