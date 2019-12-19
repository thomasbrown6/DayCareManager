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
           const res = await axios.get(`/api/classrooms/daycare/${id}`);

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
export const addClassroom = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/daycare/classroom', formData, config);

        dispatch({
            type: UPDATE_CLASSROOM,
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
            type: CLASSROOM_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};


// Add Student
export const addStudent = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/classroom/student', formData, config);

        dispatch({
            type: UPDATE_CLASSROOM,
            payload: res.data
        });

        dispatch(setAlert('Student Added', 'success'));
        history.push('/dashboard');
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
export const deleteStudent = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/classroom/student/${id}`);

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
};

// Delete classroom
export const deleteClassroom = () => async dispatch => {
    if (window.confirm('Are you sure you want to delete your classroom?')) {
        try {
            await axios.delete('/api/classroom');

            dispatch({ type: CLEAR_CLASSROOM });
            dispatch({ type: DELETE_CLASSROOM });

            dispatch(setAlert('Your daycare has been deleted'));
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
