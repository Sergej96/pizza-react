import React from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import { pizzaDetailLoader } from './pages/PizzaDetail';
import PageError from './pages/PageError';

const Cart = React.lazy(() => import('./pages/Cart'));
const PizzaDetail = React.lazy(() => import('./pages/PizzaDetail'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route
                path="pizzas/:id"
                element={<PizzaDetail />}
                loader={pizzaDetailLoader}
                errorElement={<PageError />}
            />
            <Route path="*" element={<NotFound />} />
        </Route>,
    ),
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
