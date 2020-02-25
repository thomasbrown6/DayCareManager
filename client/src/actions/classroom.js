import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_ERROR,
  UPDATE_CLASSROOM,
  CLEAR_CLASSROOMS,
  DELETE_CLASSROOM,
  GET_STUDENTS,
  STUDENTS_ERROR
} from "./types";

// Get classrooms by daycare
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

// Get students by daycare
export const getStudentsByDaycare = id => async dispatch => {
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

// Add Classroom
export const addClassroom = (formData, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/daycares/classrooms/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_CLASSROOM,
      payload: res.data
    });

    dispatch(setAlert("Classroom Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Add Student
export const addStudent = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    //const class = await axios.get('/api');

    const res = await axios.put("/api/classrooms/student", formData, config);

    dispatch({
      type: UPDATE_CLASSROOM,
      payload: res.data
    });

    dispatch(setAlert("Student Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Delete student
export const deleteStudent = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/classroom/student/${id}`);

    dispatch({
      type: UPDATE_CLASSROOM,
      payload: res.data
    });

    dispatch(setAlert("Student Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Delete classroom
export const deleteClassroom = (daycareId, classId) => async dispatch => {
  if (window.confirm("Are you sure you want to delete your classroom?")) {
    try {
      const res = await axios.delete(
        `/api/daycares/classrooms/${daycareId}/${classId}`
      );

      dispatch({ type: DELETE_CLASSROOM });
      dispatch({ type: GET_CLASSROOMS, payload: res.data });

      dispatch(setAlert("Your classroom has been deleted", "error"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "error")));
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
