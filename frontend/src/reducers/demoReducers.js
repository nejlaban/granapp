import { BUY_PRODUCT, CLEAR_DATA } from '../actions/demoActions';

const initialState = {
    bread: 20,
    milk: 20,
    chocolate: 20
}

const demoReducers = (state = initialState, action) => {
    switch (action.type) {
        case BUY_PRODUCT:
            return {
                ...state,
                [action.name]: state[action.name] - action.amount 
            }
        case CLEAR_DATA:
            return state;
        default:
            return state;
    }
}

export default demoReducers;