export type Sort = {
    // name: 'популярности' | 'цене' | 'алфавиту';
    // type: 'rating' | 'price' | 'title';
    // order?: 'asc' | 'desc';
    name: string;
    type: string;
    order?: string;
};

export interface FilterSliceState {
    categoryId: number;
    sort: Sort;
    searchValue: string;
}
