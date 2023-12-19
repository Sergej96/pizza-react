import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { SearchContext } from './contexts/search-context';

function App() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
