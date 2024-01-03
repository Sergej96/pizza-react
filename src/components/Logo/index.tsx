import React from 'react';
import { Link } from 'react-router-dom';

import logoSite from '../../../assets/img/pizza-logo.svg';

const Logo = () => {
    return (
        <Link to="/" preventScrollReset={true} className="header__logo">
            <img width="38" src={logoSite} alt="Pizza logo" />
            <div>
                <h1>React Pizza V2</h1>
                <p>самая вкусная пицца во вселенной</p>
            </div>
        </Link>
    );
};

export default Logo;
