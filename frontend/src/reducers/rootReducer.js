import { combineReducers } from 'redux';

/* Import individual reducers */
import productReducer from './productReducers';
import demoReducers from './demoReducers';

const granApp = combineReducers({
    products: productReducer,
    demo: demoReducers
})

export default granApp;