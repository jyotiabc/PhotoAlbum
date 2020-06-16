import {
    FETCH_IMAGES_FAILURE,
    FETCH_IMAGES_START,
    FETCH_IMAGES_SUCCESS
} from '../types';

let initialState = {
    pictures: [],
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGES_START:
            return { ...state, isLoading: true }
        case FETCH_IMAGES_SUCCESS:
            return { ...state, pictures: action.payload, isLoading: false }
        case FETCH_IMAGES_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}