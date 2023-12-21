import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
    },
});
