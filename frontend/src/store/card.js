import { csrfFetch } from "./csrf";

const GET_MOST_PLAYED_STANDARD_CARDS = '/cards/mostPlayedStandard';

const getMostPlayedStandardCards = (cards) => ({
  type: GET_MOST_PLAYED_STANDARD_CARDS,
  payload: cards
});

export const thunk_getMostPlayedStandardCards = () => async (dispatch) => {
  const res = await csrfFetch('/api/cards/mostplayed-standard');

  if (res.ok) {
    const data = await res.json();
    dispatch(getMostPlayedStandardCards(data));
  } else {
    console.error('error fetching most played cards');
  }
};

const initialState = {
  mostPlayed: null
};

const cardReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_MOST_PLAYED_STANDARD_CARDS:
      newState = Object.assign({}, state);
      newState.mostPlayed = action.payload;
      return newState;
    default:
      return state;
  }
};

export default cardReducer;
