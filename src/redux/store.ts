import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/slice';
import pizzaReducer from '../features/pizza/slice';
import cartReducer from '../features/cart/slice';
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
