import React from 'react';
import PropTypes from 'prop-types';
import { setCategoryId } from '../../features/filter/filterSlice';
import { useDispatch } from 'react-redux';

const Categories = ({ id }) => {
    const dispatch = useDispatch();
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];
    const changeCategory = (index) => {
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

Categories.propTypes = {
    id: PropTypes.number,
};

export default Categories;
