import { combineReducers } from 'redux';
import Picture from './picture_reducer';

//Currently there is only 1 reducer, so we can import that reducer directly.
//But in future, if there are many reducers, you can create them on separrate files and combine them here.
const rootReducer = combineReducers({
    Picture
});

export default rootReducer;