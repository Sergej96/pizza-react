import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    selectStateFilter,
    setSort,
} from '../../../features/filter/filterSlice';

type SortItem = {
    name: string;
    type: string;
};

type PopupEvent = MouseEvent & { target: HTMLElement };

export const sortList: SortItem[] = [
    { name: 'популярности', type: 'rating' },
    { name: 'цене', type: 'price' },
    { name: 'алфавиту', type: 'title' },
];

const Sort: React.FC = () => {
    const dispatch = useDispatch();
    const { sort } = useSelector(selectStateFilter);
    const sortRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onSelectSort = (objSort: SortItem) => {
        dispatch(setSort(objSort));
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupEvent;
            if (sortRef.current && !sortRef.current.contains(_event.target)) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <button
                className={
                    'sort__label ' +
                    (sort.order === 'asc'
                        ? 'sort__label--asc'
                        : 'sort__label--desc')
                }
            >
                <svg
                    onClick={() =>
                        dispatch(
                            setSort({
                                order: sort.order === 'asc' ? 'desc' : 'asc',
                            }),
                        )
                    }
                    width="30"
                    height="26"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsOpen((prev) => !prev)}>
                    {sort.name}
                </span>
            </button>
            {isOpen && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((item, index) => (
                            <li
                                key={index}
                                className={
                                    item.type === sort.type ? 'active' : ''
                                }
                                onClick={() => onSelectSort(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;