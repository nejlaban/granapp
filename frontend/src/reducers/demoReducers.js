import { BUY_ITEM } from '../actions/demoActions';

const initialState = {
    milk: 20,
    bread: 20,
    chocolate: 20
};

const buyItem = (state = initialState, action) => {
    switch (action.type) {
        case BUY_ITEM:
            return {
                ...state,
                [action.name]: state[action.name] - action.amount
            };
        /* Default state, if no action was matched */
        default:
            return state;
    }
}

export default buyItem;