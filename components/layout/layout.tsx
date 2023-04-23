import {Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal} from 'react';

import MainNavigation from './main-navigation';

function Layout(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    return (
        <Fragment>
            <MainNavigation/>
            <main>{props.children}</main>
        </Fragment>
    );
}

export default Layout;
