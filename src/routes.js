import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Home from './pages/Home';
import Whoami from './pages/Whoami';
import Library from './pages/Library';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}  />
                <Route path="/login" component={Login} />
                <Route path="/contato" component={Contact} />
                <Route path="/quemsoueu" component={Whoami} />
                <Route path="/biblioteca" component={Library} />
            </Switch>
        </BrowserRouter>
    );
};
