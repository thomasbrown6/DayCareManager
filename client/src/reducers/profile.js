import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loaded: true
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loaded: true
      }

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loaded: true,
        profile: null
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loaded: true,
        error: null
      };

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loaded: true
      }

    default:
      return state;
  }
}
