import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Skeleton from '../../components/categories/Pizza-Block/skeleton';
import PizzaBlock from '../../components/categories/Pizza-Block';
import Categories from '../../components/categories';
import Sort from '../../components/categories/Sort';
import Pagination from '../../components/categories/Pagination';
import { SearchContext } from '../../contexts/search-context';
import { useSelector } from 'react-redux';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId, sort } = useSelector((state) => state.filter);
    const { page, limitShow } = useSelector((state) => state.pizza);

    const { searchValue } = useContext(SearchContext);

    useEffect(() => {
        setIsLoading(true);
        const catogiry = categoryId ? `category=${categoryId}` : '';
        axios
            .get(
                `https://658032146ae0629a3f5495b5.mockapi.io/items?${catogiry}&sortBy=${sort.type}&order=${sort.order}&limit=${limitShow}&page=${page}&title=${searchValue}`,
            )
            .then((response) => {
                setItems(response.data);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, page, sort, searchValue]);

    return (
        <>
            <div className="content__top">
                <Categories id={categoryId} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(limitShow)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
                {}
            </div>
            <Pagination />
        </>
    );
};

export default Home;
