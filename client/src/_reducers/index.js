import { combineReducers } from 'redux';
import auth from './auth';
import item from './item';
import alert from './alert';

export default combineReducers({ auth, item, alert });
