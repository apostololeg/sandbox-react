import React from 'react'
import { Router } from '@reach/router'

import LazyComponent from 'components/LazyComponent'
import Home from 'components/Home'
import NoMatch from './NoMatch'

function Routes({ isLogged }) {
    return (
        <Router>
            <Home path="/">
                <LazyComponent
                    path="admin"
                    loader={() => import('components/Admin')} a="2" />
            </Home>
            <NoMatch default />
        </Router>
    );
}

export default Routes;
