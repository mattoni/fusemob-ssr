import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/Routing";

import { AsyncAbout } from "../../containers/About";
// import { Currency } from "../../containers/Currency";
import { AsyncHome } from "../../containers/Home";

export const App = () => (
    <section>
        <Helmet>
            <title>FuseMob SSR</title>
        </Helmet>

        <Header />

        <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/about" component={AsyncAbout} />
            <Route component={NotFound} />
        </Switch>
    </section>
);
