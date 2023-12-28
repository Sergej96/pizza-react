export default interface IPizza {
    id: string;
    title: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}