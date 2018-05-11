import {combineReducers} from 'redux';
import StationLog from './stationLog';
import Login from './login';
import Student from './student';

export default combineReducers({
    StationLog, Login, Student
});