import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export const selectCart = createSelector(
    (state: RootState) => state.cart,
    (state) => state,
);
export const selectCartItemFind = createSelector(
    (id: string, size: number, type: string) => (state: RootState) =>
        state.cart.products.find(
            (item) =>
                item.id === id && item.size === size && item.type === type,
        ),
    (product) => product,
);
