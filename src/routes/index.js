import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {
    BASE_ROUTE,
    CARD_VIEW
} from '../constants/routes';

import PageNotFound from '../components/PageNotFound';
import StateWise from '../components/StateWiseData/StateWise';
import { StateWiseCard } from '../components/StateWiseData/StateWiseCard';


export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={BASE_ROUTE} exact component={StateWise} />
                <Route path={CARD_VIEW} exact component={StateWiseCard} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    )
}
