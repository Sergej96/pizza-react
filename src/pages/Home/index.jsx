import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';

import Skeleton from '../../components/categories/Pizza-Block/skeleton';
import PizzaBlock from '../../components/categories/Pizza-Block';
import Categories from '../../components/categories';
import Sort, { sortList } from '../../components/categories/Sort';
import Pagination from '../../components/categories/Pagination';
import { SearchContext } from '../../contexts/search-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCategoryId, setSort } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pizza/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId, sort } = useSelector((state) => state.filter);
    const { page, limitShow } = useSelector((state) => state.pizza);

    const { searchValue } = useContext(SearchContext);
    const fetchPizzas = () => {
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
    };

    useEffect(() => {
        if (isMounted.current) {
            console.log('nav');
            console.log(sort, categoryId, page);
            const queryString = qs.stringify({
                sortBy: sort.type,
                order: sort.order,
                categoryId,
                page,
            });

            navigate(`?${queryString}`);
        } else {
            isMounted.current = true;
        }
    }, [categoryId, page, sort]);

    useEffect(() => {
        if (window.location.search) {
            console.log(window.location.search);
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((sort) => sort.type === params.sortBy);
            console.log(sort);
            dispatch(setCurrentPage(Number(params.page)));
            dispatch(setCategoryId(Number(params.categoryId)));
            dispatch(setSort({ ...sort, order: params.order }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
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
