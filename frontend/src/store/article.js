import { csrfFetch } from './csrf';

const GET_ALL_ARTICLES = '/articles/all';
const GET_HOMEPAGE_ARTICLES = '/articles/homepage';

const getAllArticles = (articles) => ({
  type: GET_ALL_ARTICLES,
  payload: articles
});

const getHomepageArticles = (articles) => ({
  type: GET_HOMEPAGE_ARTICLES,
  payload: articles
});

export const thunk_getAllArticles = () => async (dispatch) => {
  const res = await csrfFetch('/api/articles/all');

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllArticles(data));
  } else {
    console.error('error fetching all articles');
  }
};

export const thunk_getHomepageArticles = () => async (dispatch) => {
  const res = await csrfFetch('/api/articles/homepage');

  if (res.ok) {
    const data = await res.json();
    dispatch(getHomepageArticles(data));
  } else {
    console.error('error fetching homepage articles');
  }
};

const initialState = {
  allArticles: null,
  homepage: null
};

const articleReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_ARTICLES:
      newState = Object.assign({}, state);
      newState.allArticles = action.payload;
      return newState;
    case GET_HOMEPAGE_ARTICLES:
      newState = Object.assign({}, state);
      newState.homepage = action.payload;
      return newState;
    default:
      return state;
  }
};

export default articleReducer;
