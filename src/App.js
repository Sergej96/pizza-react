import React from 'react';
import Categories from './components/categories/Categorise';
import Sort from './components/categories/Sort';
import PizzaBlock from './components/categories/pizza-block/PizzaBlock';
import Header from './components/header/Header';
import pizzasData from './assets/pizzas.json';
import './scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzasData.map((pizza) => (
                            <PizzaBlock key={pizza.id} {...pizza} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
