/* eslint-disable react/display-name */
import React from 'react';
import { setCategoryId } from '../../features/filter/slice';
import { useAppDispatch } from '../../redux/store';

type CategoriesProps = {
    id: number;
};

export const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
];
const Categories: React.FC<CategoriesProps> = React.memo(({ id }) => {
    const dispatch = useAppDispatch();
    const changeCategory = (index: number) => {
        dispatch(setCategoryId(index));
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((name, index) => (
                    <li
                        key={index}
                        className={id === index ? 'active' : ''}
                        onClick={() => changeCategory(index)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
