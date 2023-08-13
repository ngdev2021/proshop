import { createSlice } from "@reduxjs/toolkit";

// const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] }
const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    itemsPrice: localStorage.getItem('itemsPrice') ? JSON.parse(localStorage.getItem('itemsPrice')) : 0,
    shippingPrice: localStorage.getItem('shippingPrice') ? JSON.parse(localStorage.getItem('shippingPrice')) : 0,
    taxPrice: localStorage.getItem('taxPrice') ? JSON.parse(localStorage.getItem('taxPrice')) : 0,
    totalPrice: localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
}


const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            // Calculate item price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            // Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            // Calculate tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
            // Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
            
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        
     
      
    clearCart: (state) => {
        state.cartItems = [];
        state.itemsPrice = 0;
        state.shippingPrice = 0;
        state.taxPrice = 0;
        state.totalPrice = 0;
        localStorage.removeItem('cartItems');
    }

},

})

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;