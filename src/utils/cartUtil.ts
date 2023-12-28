import { CartItem } from '../features/cart/cartSlice';

export const getCartFromLS = () => {
    const cartStr = localStorage.getItem('cart');
    const products = cartStr ? JSON.parse(cartStr) : [];
    const totalPrice = calcTotalPrice(products);

    return {
        products,
        totalPrice,
    };
};

export const calcTotalPrice = (products: CartItem[]) => {
    return products.reduce((sum, item) => {
        return sum + item.price * Number(item.count);
    }, 0);
};

export const calcTotalCount = (products: CartItem[]) => {
    return products.reduce(
        (count: number, item: CartItem) => count + item.count,
        0,
    );
};
