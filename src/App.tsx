import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));
const PizzaDetail = React.lazy(() => import('./pages/PizzaDetail'));

function App() {
    return (
        <Suspense fallback={<div>Загрузка страницы</div>}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="pizzas/:id" element={<PizzaDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
