import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="130" r="130" />
        <rect x="0" y="279" rx="10" ry="10" width="280" height="24" />
        <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="412" rx="10" ry="10" width="90" height="25" />
        <rect x="129" y="405" rx="10" ry="10" width="150" height="45" />
    </ContentLoader>
);

export default Skeleton;
