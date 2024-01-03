import { Sort } from '../filter/types';

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

export type FetchPizzasArgs = {
    categoryId: number;
    sort: Sort;
    limitShow: number;
    page: number;
    searchValue: string;
};

export enum Status {
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
