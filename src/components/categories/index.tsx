import React from 'react';
import { setCategoryId } from '../../features/filter/filterSlice';
import { useAppDispatch } from '../../redux/store';

type CategoriesProps = {
    id: number;
};

const Categories: React.FC<CategoriesProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];
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
};

export default Categories;