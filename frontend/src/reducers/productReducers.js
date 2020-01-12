/* Import usable actions */
import { GET_ALL_PRODUCTS } from './../actions/productActions';

/* Define an "initial state" of the reducer */
const initialState = [ ];

/* Define a reducer function: on "action", it will do something */
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return action.products;
        /* Default state */
        default:
            return state;
        }
}

export default productReducer;
