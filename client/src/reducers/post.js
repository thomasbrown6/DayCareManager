import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';
import { addPost } from '../actions/post';

const initialState = {
  posts: [],
  post: null,
  loaded: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loaded: true
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loaded: true
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loaded: true
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loaded: true
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loaded: true
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loaded: true
      };

      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: payload },
          loaded: true
        }

    case DELETE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: state.post.comments.filter(comment => comment._id !== payload) },
        loaded: true
      }

    default:
      return state;
  }
}
