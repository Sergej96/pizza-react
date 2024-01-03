import React, { useEffect, useRef } from 'react';
import qs from 'qs';

import Skeleton from '../../components/PizzaBlock/skeleton';
import PizzaBlock from '../../components/PizzaBlock';
import Categories, { categories } from '../../components/Categories';
import { sortList } from '../../components/SortPopup';
import Pagination from '../../components/Pagination';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '../../redux/store';
import SortPopup from '../../components/SortPopup';
import { selectStateFilter } from '../../features/filter/selectors';
import { selectStatePizza } from '../../features/pizza/selectors';
import { fetchPizzas, setCurrentPage } from '../../features/pizza/slice';
import { setCategoryId, setSort } from '../../features/filter/slice';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, searchValue } = useSelector(selectStateFilter);
    const { page, limitShow, items, status } = useSelector(selectStatePizza);

    const getPizzas = async () => {
        dispatch(
            fetchPizzas({
                categoryId,
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
            dispatch(setSort({ ...sort, order: String(params.order) }));
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
                <SortPopup sort={sort} />
            </div>
            <h2 className="content__title">{categories[categoryId]} пиццы</h2>
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
                </div>
            )}

            {status === 'success' && <Pagination />}
        </>
    );
};

export default Home;
