import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getProduct(state, action) {
            return state.products.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.size === action.payload.size &&
                    item.type === action.payload.type,
            );
        },
        calcTotalPrice(state) {
            state.totalPrice = state.products.reduce((sum, item) => {
                return sum + item.price * item.count;
            }, 0);
        },
        addProduct(state, action) {
            const findProduct = cartSlice.caseReducers.getProduct(
                state,
                action,
            );

            if (findProduct) {
                findProduct.count++;
            } else {
                state.products.push({ ...action.payload, count: 1 });
            }

            cartSlice.caseReducers.calcTotalPrice(state);
        },
        changeCount(state, action) {
            const findProduct = cartSlice.caseReducers.getProduct(
                state,
                action,
            );

            if (action.payload.count === 0) {
                cartSlice.caseReducers.removeProduct(state, action);
                return;
            }
            findProduct.count = action.payload.count;
            cartSlice.caseReducers.calcTotalPrice(state);
        },
        removeProduct(state, action) {
            if (window.confirm('Вы уверены что хотите удалить пиццу?')) {
                state.products = state.products.filter((item) => {
                    return (
                        item.id !== action.payload.id ||
                        item.size !== action.payload.size ||
                        item.type !== action.payload.type
                    );
                });
                cartSlice.caseReducers.calcTotalPrice(state);
            }
        },
        clearCart(state) {
            state.products = [];
            state.totalPrice = 0;
        },
    },
});

export const { addProduct, changeCount, removeProduct, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
