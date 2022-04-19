import { csrfFetch } from "./csrf";

const GET_MOST_PLAYED_CARDS = '/cards/mostPlayed';

const getMostPlayedCards = (cards) => ({
  type: GET_MOST_PLAYED_CARDS,
  payload: cards
});

export const thunk_getMostPlayedCards = () => async (dispatch) => {
  const res = await csrfFetch('/api/cards/mostplayed');

  if (res.ok) {
    const data = await res.json();
    dispatch(getMostPlayedCards(data));
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
    case GET_MOST_PLAYED_CARDS:
      newState = Object.assign({}, state);
      newState.mostPlayed = action.payload;
      return newState;
    default:
      return state;
  }
};

export default cardReducer;
