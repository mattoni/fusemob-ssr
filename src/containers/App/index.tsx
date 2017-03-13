import { Header } from "../../components/Header";
import { NotFound } from "../../components/Routing";
import { Home } from "../../containers/Home";
import { About } from "../../containers/About";
import * as React from "react";
import * as Helmet from "react-helmet";
import { Route, Switch } from "react-router-dom";

export class App extends React.Component<{}, {}> {

    public render() {
        return (
            <section>
                <Helmet title="FuseMob-SSR"/>
                <Header />
                <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </section>
        );
    }
}
