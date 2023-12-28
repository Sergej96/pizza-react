import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type Sort = {
    // name: 'популярности' | 'цене' | 'алфавиту';
    // type: 'rating' | 'price' | 'title';
    // order?: 'asc' | 'desc';
    name: string;
    type: string;
    order?: string;
};

interface FilterSliceState {
    categoryId: number;
    sort: Sort;
    searchValue: string;
}

const initialState: FilterSliceState = {
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
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort | Pick<Sort, 'order'>>) {
            state.sort = { ...state.sort, ...action.payload };
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

export const selectStateFilter = (state: RootState) => state.filter;
export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
