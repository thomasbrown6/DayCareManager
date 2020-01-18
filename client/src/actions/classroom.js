import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_ERROR,
  UPDATE_CLASSROOM,
  CLEAR_CLASSROOM,
  DELETE_CLASSROOM
} from './types';

// Get profile by Id
export const getClassroomsByDaycare = id => async dispatch => {
  try {
    const res = await axios.get(`/api/daycares/classrooms/${id}`);

    dispatch({
      type: GET_CLASSROOMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Get classroom by Id
export const getClassroomById = (daycare_id, class_id) => async dispatch => {
  console.log(`GET: /api/daycares/classrooms/${daycare_id}/${class_id}`);
  try {
    const res = await axios.get(
      `/api/daycares/classrooms/${daycare_id}/${class_id}`
    );

    console.log(`Response: ${res.data}`);

    dispatch({
      type: GET_CLASSROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Get profile by Id
// export const getDaycareById = userId => async dispatch => {
//     try {
//         const res = await axios.get(`/api/daycare/user/${userId}`);

//         dispatch({
//             type: GET_DAYCARE,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: CLASSROOM_ERROR,
//             payload: { msg: err.response, status: err.response.status }
//         });
//     }
// };

// Add Classroom
export const addClassroom = (formData, id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/daycares/classrooms/${id}`,
      formData,
      config
    );

    dispatch({
      type: GET_CLASSROOMS,
      payload: res.data
    });

    dispatch(setAlert('Classroom Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Delete classroom
export const deleteClassroom = (daycare_id, class_id) => async dispatch => {
  if (window.confirm('Are you sure you want to delete your classroom?')) {
    try {
      const res = await axios.delete(
        `/api/daycares/classrooms/${daycare_id}/${class_id}`
      );

      dispatch({ type: CLEAR_CLASSROOM });
      dispatch({ type: GET_CLASSROOMS, payload: res.data });

      dispatch(setAlert('Classroom Removed', 'primary'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: CLASSROOM_ERROR,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }
  }
};

// Add Student
export const addStudent = (
  formData,
  daycare_id,
  class_id
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //const class = await axios.get('/api');

    const res = await axios.put(
      `/api/daycares/classrooms/students/${daycare_id}/${class_id}`,
      formData,
      config
    );

    // dispatch({
    //   type: UPDATE_CLASSROOM,
    //   payload: res.data
    // });

    dispatch(setAlert('Student Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Delete student
export const deleteStudent = (
  daycare_id,
  class_id,
  stud_id
) => async dispatch => {
  if (window.confirm('Are you sure you want to delete student?')) {
    try {
      const res = await axios.delete(
        `/api/daycares/classrooms/${daycare_id}/${class_id}/${stud_id}`
      );
      dispatch({
        type: CLEAR_CLASSROOM
      });
      dispatch({
        type: UPDATE_CLASSROOM,
        payload: res.data
      });

      dispatch(setAlert('Student Removed', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: CLASSROOM_ERROR,
        payload: { msg: err.response, status: err.response.status }
      });
    }
  }
};
