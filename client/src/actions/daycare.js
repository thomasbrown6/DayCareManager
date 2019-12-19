import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_DAYCARE,
  GET_DAYCARES,
  DAYCARE_ERROR,
  UPDATE_DAYCARE,
  CLEAR_DAYCARE,
  DELETE_DAYCARE,
  GET_DAYCARESTUDENTS,
  DAYCARESTUDENTS_ERROR,
  UPDATE_DAYCARESTUDENTS,
  CLEAR_DAYCARESTUDENTS,
  DELETE_DAYCARESTUDENTS
} from './types';

// Get users daycares
export const getUserDaycares = () => async dispatch => {
    try {
        const res = await axios.get('/api/daycares/me');

        dispatch({
            type: GET_DAYCARES,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: CLEAR_DAYCARE });

        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all daycares
export const getDaycares = () => async dispatch => {
    dispatch({ type: CLEAR_DAYCARE });

    try {
        const res = await axios.get('/api/daycares');

        dispatch({
            type: GET_DAYCARES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};

// Get profile by Id
export const getDaycareById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/daycares/${id}`);

        dispatch({
            type: GET_DAYCARE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};





// Create or Update a Daycare
export const createDaycare = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/daycares', formData, config);
        dispatch({
            type: GET_DAYCARE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Daycare Updated' : 'Daycare Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};


// Add Classroom
export const addClassroom = (formData, history, daycareId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`/api/daycare/classroom/${daycareId}`, formData, config);

        dispatch({
            type: UPDATE_DAYCARE,
            payload: res.data
        });

        dispatch(setAlert('Classroom Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        // const errors = err.response.data.errors;

        // if (errors) {
        //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};



// Delete classroom
export const deleteClassroom = (daycareId, classroomId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/daycare/classroom/${daycareId}/${classroomId}`);

        dispatch({
            type: UPDATE_DAYCARE,
            payload: res.data
        });
        dispatch(setAlert('Classroom Removed', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: DAYCARE_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};

// Delete daycare
export const deleteDaycare = id => async dispatch => {
    if (window.confirm('Are you sure you want to delete your daycare?')) {
        try {
            await axios.delete(`/api/daycares/${id}`);

            dispatch({ type: CLEAR_DAYCARE });
            dispatch({ type: DELETE_DAYCARE });

            dispatch(setAlert('Your daycare has been deleted'));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: DAYCARE_ERROR,
                payload: {
                    msg: err.response,
                    status: err.response.status
                }
            });
        }
    }
};
