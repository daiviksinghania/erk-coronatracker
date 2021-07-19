import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {
    BASE_ROUTE,
    CARD_VIEW,
    INFINITE_SCROLL_CLASS,
    INFINITE_SCROLL_FUNC
} from '../constants/routes';

import PageNotFound from '../components/PageNotFound';
import StateWise from '../components/StateWiseData/StateWise';
import { StateWiseCard } from '../components/StateWiseData/StateWiseCard';
import { InfiniteScrollClass } from '../components/StateWiseData/InfiniteScrollClass';
import { InfiniteScrollFunc } from '../components/StateWiseData/InfiniteScrollFunc';


export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={BASE_ROUTE} exact component={StateWise} />
                <Route path={CARD_VIEW} exact component={StateWiseCard} />
                <Route path={INFINITE_SCROLL_CLASS} exact component={InfiniteScrollClass} />
                <Route path={INFINITE_SCROLL_FUNC} exact component={InfiniteScrollFunc} />

                <Route component={PageNotFound} />
            </Switch>
        </div>
    )
}
