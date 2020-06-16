import axios from 'axios';
import { GET_IMAGES } from '../../utils/misc';
import {
    FETCH_IMAGES_FAILURE,
    FETCH_IMAGES_START,
    FETCH_IMAGES_SUCCESS
} from '../types';

export function getPics() {

    return (dispatch, getState) => {
        //When the request is in unresolved state and fetching images from server
        dispatch({ type: FETCH_IMAGES_START })
        axios({
            method: 'GET',
            url: GET_IMAGES,
        }).then(response => {
            //API call success, with data
            dispatch({ type: FETCH_IMAGES_SUCCESS, payload: response.data })
        }).catch(e => {
            //API call fails and updating the error state
            dispatch({ type: FETCH_IMAGES_FAILURE })
        });
    }

}