import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 1,
    totalCount: 10,
    limitShow: 4,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.page = action.payload;
        },
    },
});

export const { setCurrentPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
