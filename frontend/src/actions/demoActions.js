/* Action */
export const BUY_ITEM = 'BUY_ITEM'

/* Action creator */
export const buyProduct = (name, amount) => {
    return {
        type: BUY_ITEM,
        name: name,
        amount: amount
    }
}