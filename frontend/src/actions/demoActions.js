/* Action type */
export const BUY_PRODUCT = 'BUY_PRODUCT';
export const CLEAR_DATA = 'CLEAR_DATA';

/* Action creator */
export const buyProduct = (name, amount) => {
    return {
        type: BUY_PRODUCT,
        name: name,
        amount: amount
    }
}

export const clearData = () => {
    return {
        type: CLEAR_DATA
    }
}