import React, { useState } from 'react';

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    const changeActiveCategory = (index) => {
        setActiveCategory(index);
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((name, index) => (
                    <li
                        key={index}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => changeActiveCategory(index)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
