import { GET_ALL_DISCCUSIONS } from './actions';

let initialState = null;


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DISCCUSIONS:
            return{
                ...state,
                AllDisccusionsReducer: action.data
            }
        default:
            return state;
    }
}