import { csrfFetch } from './csrf';

const GET_ALL_ARTICLES = '/articles/all';

const getAllArticles = (articles) => ({
    type: GET_ALL_ARTICLES,
    payload: articles
});

export const thunk_getAllArticles = () => async (dispatch) => {
    const res = await fetch ('/api/articles/all');
    const data = await res.json();
    dispatch(getAllArticles(data));
    
}



const initialState = { allArticles: [] }
export const articleReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_ARTICLES:
            newState = Object.assign({}, state);
            newState.allArticles = action.payload;
            return newState;

        default:
            return state;
    }
}