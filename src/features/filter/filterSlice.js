import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        type: 'rating',
        order: 'asc',
    },
    searchValue: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = { ...state.sort, ...action.payload };
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },
});

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
