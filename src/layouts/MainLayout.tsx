import React, { Suspense } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <Suspense fallback={<div>Загрузка страницы</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
