import { Link } from 'react-router-dom';

import logoSite from '../../assets/img/pizza-logo.svg';
import { useAppDispatch } from '../../redux/store';
import { setCurrentPage } from '../../features/pizza/slice';
import { setCategoryId, setSort } from '../../features/filter/slice';

const Logo = () => {
    const dispatch = useAppDispatch();
    const setDefaultPizzaStore = () => {
        dispatch(setCurrentPage(1));
        dispatch(setCategoryId(0));
        dispatch(
            setSort({
                name: 'популярности',
                type: 'rating',
                order: 'asc',
            }),
        );
    };
    return (
        <Link
            to="/"
            preventScrollReset={true}
            className="header__logo"
            onClick={setDefaultPizzaStore}
        >
            <img width="38" src={logoSite} alt="Pizza logo" />
            <div>
                <h1>React Pizza V2</h1>
                <p>самая вкусная пицца во вселенной</p>
            </div>
        </Link>
    );
};

export default Logo;
