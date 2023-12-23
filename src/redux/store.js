import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import pizzaReducer from '../features/pizza/pizzaSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        pizza: pizzaReducer,
        cart: cartReducer,
    },
});
