import * as React from "react";
import * as Helmet from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { Header } from "../../components/Header";
import { AsyncRoute, NotFound } from "../../components/Routing";
import { About } from "../../containers/About";
import { Currency } from "../../containers/Currency";
import { Home } from "../../containers/Home";

export class App extends React.Component<{}, {}> {

    public render() {
        return (
            <section>
                <Helmet title="FuseMob-SSR"/>
                <Header />
                <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/" component={Home} />
                    <AsyncRoute path="/currency" component={Currency} />
                    <Route component={NotFound} />
                </Switch>
            </section>
        );
    }
}
