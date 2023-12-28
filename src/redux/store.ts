import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import pizzaReducer from '../features/pizza/pizzaSlice';
import cartReducer from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        pizza: pizzaReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
