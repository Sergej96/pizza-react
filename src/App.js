import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import PizzaDetail from './pages/PizzaDetail';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizzas/:id" element={<PizzaDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
