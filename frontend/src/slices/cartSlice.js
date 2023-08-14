import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] }
const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    itemsPrice: localStorage.getItem('itemsPrice') ? JSON.parse(localStorage.getItem('itemsPrice')) : 0,
    shippingPrice: localStorage.getItem('shippingPrice') ? JSON.parse(localStorage.getItem('shippingPrice')) : 0,
    taxPrice: localStorage.getItem('taxPrice') ? JSON.parse(localStorage.getItem('taxPrice')) : 0,
    totalPrice: localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            console.log('addToCartReducer - Item:', item);
        
            const existItem = state.cartItems.find(x => x._id === item._id);
            console.log('addToCartReducer - Exist Item:', existItem);
        
            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        
            // Ensure qty is updated as integers
            state.cartItems.forEach(item => {
                item.qty = parseInt(item.qty);
            });
        
            console.log('addToCartReducer - Updated Cart Items:', state.cartItems);
        
            return updateCart(state);
        },
        
        

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x._id !== action.payload);

            return updateCart(state);
        },

        updateItemsInCart: (state, action) => {
            state.cartItems = action.payload;
            return updateCart(state);
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

export const { addToCart, clearCart, removeFromCart, updateItemsInCart } = cartSlice.actions;

export default cartSlice.reducer;