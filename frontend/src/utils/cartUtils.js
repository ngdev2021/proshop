export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // Calculate item count 
    state.itemCount = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
    console.log(state.itemCount);
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0));
    // Calculate shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    // Calculate tax price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    // Calculate total price
    state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));

    console.log('updateCart - State:', state);


    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    localStorage.setItem('itemsPrice', JSON.stringify(state.itemsPrice));
    localStorage.setItem('shippingPrice', JSON.stringify(state.shippingPrice));
    localStorage.setItem('taxPrice', JSON.stringify(state.taxPrice));
    localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));


}

