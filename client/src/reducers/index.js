import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import daycare from './daycare';
import classroom from './classroom';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    daycare,
    classroom
});