import 'bootstrap/dist/css/bootstrap.css';
import {combineReducers} from 'redux';
import user from './user_reducer';
import chatRoom from './chatRoom_reducers';

const rootReducer = combineReducers({
    user,
    chatRoom
})

export default rootReducer;