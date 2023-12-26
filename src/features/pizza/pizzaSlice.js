import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    page: 1,
    totalCount: 10,
    limitShow: 4,
    items: [],
    status: 'loading',
};

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, sort, limitShow, page, searchValue } = params;
        const { data } = await axios.get(
            `https://658032146ae0629a3f5495b5.mockapi.io/items?${category}&sortBy=${sort.type}&order=${sort.order}&limit=${limitShow}&page=${page}&title=${searchValue}`,
        );

        return data;
    },
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.page = action.payload;
        },
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const { setCurrentPage, setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
