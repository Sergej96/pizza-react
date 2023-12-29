import { useRouteError } from 'react-router';

const PageError = () => {
    const error = useRouteError() as Response;

    return (
        <>
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2>
        </>
    );
};

export default PageError;
