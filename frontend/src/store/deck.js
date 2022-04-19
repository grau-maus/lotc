import { csrfFetch } from "./csrf";

const GET_ALL_DECKS = '/decks/all';
const GET_HOMEPAGE_DECKLISTS = '/decks/homepage';

const getAllDecks = (decks) => ({
  // TODO...
});

const getHomepageDecklists = (decklists) => ({
  type: GET_HOMEPAGE_DECKLISTS,
  payload: decklists
});

export const thunk_getAllDecks = () => async (dispatch) => {
  // TODO...
};

export const thunk_getHomepageDecklists = () => async (dispatch) => {
  const res = await csrfFetch('/api/decks/homepage');

  if (res.ok) {
    const data = await res.json();
    dispatch(getHomepageDecklists(data));
  } else {
    console.error('error fetching homepage decklists');
  }
};

const initialState = {
  allDecks: null,
  homepage: null
};

const deckReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_DECKS:
      newState = Object.assign({}, state);
      // TODO...
      return newState;
    case GET_HOMEPAGE_DECKLISTS:
      newState = Object.assign({}, state);
      newState.homepage = action.payload;
      return newState;
    default:
      return state;
  }
};

export default deckReducer;
