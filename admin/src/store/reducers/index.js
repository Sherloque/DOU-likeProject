import {combineReducers} from 'redux';
import authAdminReducer from './authAdmin.reducer';
import pendingsReducer from './pendings.reducer';
import newsReducer from './news.reducer';
import studentsReducer from './students.reducer';


export default combineReducers({
    authAdmin:authAdminReducer,
    pendings:pendingsReducer,
    studs:studentsReducer,
    news:newsReducer

});

