import React from 'react';
import styles from './Pagination.module.scss';
import PropTypes from 'prop-types';

const Pagination = ({ countTotal, limit, page, setPage }) => {
    const countPage = Math.ceil(countTotal / limit);
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
                        onClick={() => setPage(i)}
                    >
                        {i}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Pagination.propTypes = {
    countTotal: PropTypes.number,
    limit: PropTypes.number,
    page: PropTypes.number,
    setPage: PropTypes.func,
};

export default Pagination;
