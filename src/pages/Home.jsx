import React, { useEffect, useState } from 'react';

import Skeleton from '../components/categories/pizza-block/skeleton';
import PizzaBlock from '../components/categories/pizza-block/PizzaBlock';
import Categories from '../components/categories/Categorise';
import Sort from '../components/categories/Sort';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sort, setSort] = useState({
        name: 'популярности',
        type: 'rating',
    });
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        setIsLoading(true);
        const catogiry = categoryId ? `category=${categoryId}` : '';
        fetch(
            `https://658032146ae0629a3f5495b5.mockapi.io/items?${catogiry}&sortBy=${sort.type}&order=${sortOrder}`,
        )
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
    }, [categoryId, sort, sortOrder]);

    return (
        <>
            <div className="content__top">
                <Categories id={categoryId} onChangeCategory={setCategoryId} />
                <Sort
                    sortBy={sort}
                    onChangeSortBy={setSort}
                    orderSort={sortOrder}
                    setOrderSort={setSortOrder}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
                {}
            </div>
        </>
    );
};

export default Home;
