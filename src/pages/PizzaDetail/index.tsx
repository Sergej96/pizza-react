import axios from 'axios';
import React, { Suspense } from 'react';
import {
    Await,
    LoaderFunctionArgs,
    defer,
    useAsyncValue,
    useLoaderData,
} from 'react-router';
import { Pizza } from '../../features/pizza/pizzaSlice';
import { Link } from 'react-router-dom';

const PizzaContent = () => {
    const pizza = useAsyncValue() as Pizza;

    return (
        <>
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </>
    );
};
const PizzaDetail: React.FC = () => {
    const { pizza } = useLoaderData() as { pizza: Promise<Pizza> };

    return (
        <div className="content__detail">
            <Suspense fallback={<div>Загрузка...</div>}>
                <Await resolve={pizza}>
                    <PizzaContent />
                </Await>
            </Suspense>
            <Link to="/">Назад</Link>
        </div>
    );
};

const getPizza = async (id: string) => {
    try {
        const { data } = await axios.get<Pizza>(
            `https://658032146ae0629a3f5495b5.mockapi.io/items/${id}`,
        );
        return data;
    } catch (error) {
        console.log('ERROR', error);
    }
};

export const pizzaDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    return defer({
        pizza: params.id ? getPizza(params.id) : {},
    });
};

export default PizzaDetail;
