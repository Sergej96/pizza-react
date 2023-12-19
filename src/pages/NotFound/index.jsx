import React from 'react';
import styles from './style.module.scss';

const NotFound = () => {
    return (
        <div>
            <h1 className={styles.notFound}>
                <span>🙁</span>
                Ничего не найдено
            </h1>
        </div>
    );
};

export default NotFound;
