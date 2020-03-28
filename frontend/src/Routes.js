import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/Logon';
import RegisterONG from './pages/RegisterONG'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={RegisterONG} />
                <Route path="/profile" component={Profile} />
                <Route path="/incident/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}