import React, { useContext, useEffect, useState } from 'react';

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

    const totalCount = 10;
    const limit = 4;
    const [page, setPage] = useState(1);

    const { searchValue } = useContext(SearchContext);

    useEffect(() => {
        setIsLoading(true);
        const catogiry = categoryId ? `category=${categoryId}` : '';
        fetch(
            `https://658032146ae0629a3f5495b5.mockapi.io/items?${catogiry}&sortBy=${sort.type}&order=${sort.order}&limit=${limit}&page=${page}&title=${searchValue}`,
        )
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
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
                    ? [...new Array(limit)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
                {}
            </div>
            <Pagination
                countTotal={totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default Home;
