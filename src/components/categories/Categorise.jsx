import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ id, onChangeCategory }) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    const changeActiveCategory = (index) => {
        onChangeCategory(index);
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((name, index) => (
                    <li
                        key={index}
                        className={id === index ? 'active' : ''}
                        onClick={() => changeActiveCategory(index)}
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
    onChangeCategory: PropTypes.func,
};

export default Categories;
