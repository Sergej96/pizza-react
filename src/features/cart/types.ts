export type CartItem = {
    id: string;
    title: string;
    imageUrl: string;
    size: number;
    type: string;
    price: number;
    count: number;
};

export interface CartSliceState {
    products: CartItem[];
    totalPrice: number;
}
