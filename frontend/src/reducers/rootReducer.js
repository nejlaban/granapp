import { combineReducers } from 'redux';

import demoReducers from './demoReducers';

const  rootReducer = combineReducers({
    demo: demoReducers
});

export default rootReducer;