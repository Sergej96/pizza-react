import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type CartItem = {
    id: string;
    title: string;
    imageUrl: string;
    size: number;
    type: string;
    price: number;
    count: number;
};

interface CartSliceState {
    products: CartItem[];
    totalPrice: number;
}

const initialState: CartSliceState = {
    products: [],
    totalPrice: 0,
};

const getProduct = (
    state: CartSliceState,
    action: PayloadAction<{ id: string; size: number; type: string }>,
) => {
    return state.products.find(
        (item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.type === action.payload.type,
    );
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        calcTotalPrice(state) {
            state.totalPrice = state.products.reduce((sum, item) => {
                return sum + item.price * Number(item.count);
            }, 0);
        },
        addProduct(state, action: PayloadAction<CartItem>) {
            const findProduct = getProduct(state, action);

            if (findProduct && findProduct.count) {
                findProduct.count++;
            } else {
                state.products.push({ ...action.payload });
            }

            cartSlice.caseReducers.calcTotalPrice(state);
        },
        changeCount(
            state,
            action: PayloadAction<
                Omit<CartItem, 'title' | 'imageUrl' | 'price'>
            >,
        ) {
            const findProduct = getProduct(state, action);

            if (action.payload.count === 0) {
                cartSlice.caseReducers.removeProduct(state, action);
                return;
            }
            if (findProduct) {
                findProduct.count = action.payload.count;
            }
            cartSlice.caseReducers.calcTotalPrice(state);
        },
        removeProduct(
            state,
            action: PayloadAction<
                | CartItem
                | Omit<CartItem, 'title' | 'imageUrl' | 'price' | 'count'>
            >,
        ) {
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemFind =
    (id: string, size: number, type: string) => (state: RootState) =>
        state.cart.products.find(
            (item) =>
                item.id === id && item.size === size && item.type === type,
        );

export const { addProduct, changeCount, removeProduct, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;