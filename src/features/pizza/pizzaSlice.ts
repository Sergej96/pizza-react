import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { Sort } from '../filter/filterSlice';

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

type FetchPizzasArgs = {
    categoryId: number;
    sort: Sort;
    limitShow: number;
    page: number;
    searchValue: string;
};

enum Status {
    SUCCESS = 'success',
    LOADING = 'loading',
    ERROR = 'error',
}

export interface PizzaSliceState {
    page: number;
    totalCount: number;
    limitShow: number;
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    page: 1,
    totalCount: 10,
    limitShow: 4,
    items: [],
    status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { categoryId, sort, limitShow, page, searchValue } = params;

        const { data } = await axios.get<Pizza[]>(
            `https://658032146ae0629a3f5495b5.mockapi.io/items`,
            {
                params: {
                    category: categoryId || '',
                    sortBy: sort.type,
                    order: sort.order,
                    limit: limitShow,
                    page: page,
                    title: searchValue,
                },
            },
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
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const selectStatePizza = (state: RootState) => state.pizza;
export const { setCurrentPage, setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
