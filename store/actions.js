export const GET_ALL_DISCCUSIONS = 'GET_ALL_DISCCUSIONS';

const BASE_URL = 'https://whatshotapp.herokuapp.com/api/dis';




export const getAllDisccusionsDispatch = async data => {
    return dispatch => {
        dispatch({type: GET_ALL_DISCCUSIONS, data});
    }
}


export const getAllDisccusionsAction = () => {
    return async dispatch => {
        const response = await fetch(BASE_URL + '/getAllDisccusions', {
            method:'GET',
            headers:{
                'Content-type': 'application/json',
            }
        });

        const apiData = await response.json();
        if(apiData) {
            dispatch(getAllDisccusionsDispatch(apiData));
        } else {
            throw new Error('Somthing wen wrong');
        }
    }
}