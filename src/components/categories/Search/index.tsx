import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearchValue } from '../../../features/filter/filterSlice';
import { useAppDispatch } from '../../../redux/store';

const Search: React.FC = () => {
    const dispatch = useAppDispatch();
    const [elSearchValue, setElSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 250),
        [],
    );
    const onSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setElSearchValue(event.target.value);
        updateSearchValue(event.target.value);
    };
    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setElSearchValue('');
        inputRef.current?.focus();
    };

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                className={styles.inputSearch}
                placeholder="Поиск пиццы..."
                value={elSearchValue}
                onChange={onSearchValue}
            />
            {elSearchValue ? (
                <svg
                    className={styles.icon}
                    onClick={onClickClear}
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                        fill="#0F0F0F"
                    />
                </svg>
            ) : (
                <svg
                    className={styles.icon}
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
    );
};

export default Search;
