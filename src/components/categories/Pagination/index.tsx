import React from 'react';
import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import {
    selectStatePizza,
    setCurrentPage,
} from '../../../features/pizza/pizzaSlice';
import { useAppDispatch } from '../../../redux/store';

const Pagination: React.FC = () => {
    const { page, totalCount, limitShow } = useSelector(selectStatePizza);
    const dispatch = useAppDispatch();
    const countPage = Math.ceil(totalCount / limitShow);
    const arPage = [];
    for (let i = 1; i <= countPage; i++) {
        arPage.push(i);
    }

    return (
        <div className={styles.root}>
            <ul className={styles.pagination}>
                {arPage.map((i) => (
                    <li
                        key={i}
                        className={page === i ? styles.active : ''}
                        onClick={() => dispatch(setCurrentPage(i))}
                    >
                        {i}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
