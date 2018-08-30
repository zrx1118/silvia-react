import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
import home from "@/pages/home/home";

const record = asyncComponent(() => import("@/pages/record/record"));
const helpcenter = asyncComponent(() => import("@/pages/helpcenter/helpcenter"));
const production = asyncComponent(() => import("@/pages/production/production"));
const balance = asyncComponent(() => import("@/pages/balance/balance"));

export default class RouterConfig extends Component{
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={home}/>
                    <Route path="/record" exact component={record}/>
                    <Route path="/helpcenter" exact component={helpcenter}/>
                    <Route path="/production" exact component={production}/>
                    <Route path="/balance" exact component={balance}/>
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        )
    }
}