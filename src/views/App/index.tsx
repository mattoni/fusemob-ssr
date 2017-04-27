import * as React from "react";
import { Helmet } from "react-helmet";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/Routing";

import { AsyncAbout } from "../../views/About";
import { Currency } from "../../views/Currency";
import { AsyncHome } from "../../views/Home";

export const App = () => (
    <section>
        <Helmet>
            <title>FuseMob SSR</title>
        </Helmet>

        <Header />
            <Route exact path="/" component={AsyncHome} />
            <Route path="/about" component={AsyncAbout} />
            <Route path="/currency" component={Currency} />
            <Route component={NotFound} />
    </section>
);
