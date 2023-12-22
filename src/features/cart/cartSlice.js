import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    totalPrice: 0,
};

const cartSlice = configureStore({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products.filter((item) => item.id !== action.payload);
        },
        clearProduct(state) {
            state.products = [];
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducers;
