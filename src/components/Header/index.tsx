import React from 'react';
import Search from '../Search';
import Logo from '../Logo';
import ButtonCart from '../ButtonCart';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="container">
                <Logo />
                <Search />
                <ButtonCart />
            </div>
        </div>
    );
};

export default Header;
