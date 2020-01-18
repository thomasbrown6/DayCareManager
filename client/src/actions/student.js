import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_STUDENTS,
  STUDENTS_ERROR,
  UPDATE_STUDENTS,
  CLEAR_STUDENTS,
  DELETE_STUDENTS
} from './types';

// Get students for daycare
export const getStudentsForDaycare = id => async dispatch => {
  try {
    const res = await axios.get(`/api/daycares/${id}/students`);

    dispatch({
      type: GET_STUDENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STUDENTS_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};
