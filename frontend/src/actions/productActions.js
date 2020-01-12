import Axios from 'axios';
import config from '../config';

/* Action */
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/* Action creator */
export const getAllProducts = () => {
    return (dispatch) => {
        let products = [ ];
        Axios.get(`${config.BASE_URL}/public/items`).then(response => {
            /* Use response.data to access the actual data */
           products = response.data;
        }).catch(error => {
            /* Use error to get the error message, or error.response(.data) to get all data returned with the error. */
            console.log(error.response);
        }).finally(() => {
            /* finally() executes at the end of the request, regardless if it succeeded or not */
            console.log(`${products.length} items have been retrieved.`);
            /* We should not directly mutate the state, but rather pass in a copy */
            dispatch({
                type: GET_ALL_PRODUCTS,
                products: products
            });
        });
    }
}