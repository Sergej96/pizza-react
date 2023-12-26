import React, { useEffect, useRef } from 'react';
import qs from 'qs';

import Skeleton from '../../components/categories/Pizza-Block/skeleton';
import PizzaBlock from '../../components/categories/Pizza-Block';
import Categories from '../../components/categories';
import Sort, { sortList } from '../../components/categories/Sort';
import Pagination from '../../components/categories/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCategoryId, setSort } from '../../features/filter/filterSlice';
import { fetchPizzas, setCurrentPage } from '../../features/pizza/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, searchValue } = useSelector(
        (state) => state.filter,
    );
    const { page, limitShow, items, status } = useSelector(
        (state) => state.pizza,
    );

    const getPizzas = async () => {
        const category = categoryId ? `category=${categoryId}` : '';

        dispatch(
            fetchPizzas({
                category,
                sort,
                limitShow,
                page,
                searchValue,
            }),
        );
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
            getPizzas();
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
            {status === 'error' ? (
                <div className="content__empty">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        Не удалось получить пиццы. Попробуйте получить пиццы
                        позже
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(limitShow)].map((_, index) => (
                              <Skeleton key={index} />
                          ))
                        : items.map((pizza) => (
                              <PizzaBlock key={pizza.id} {...pizza} />
                          ))}
                    {}
                </div>
            )}

            {status === 'success' && <Pagination />}
        </>
    );
};

export default Home;
