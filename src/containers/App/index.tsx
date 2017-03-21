import * as React from "react";
import * as Helmet from "react-helmet";
import { Route } from "react-router-dom";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/Routing";
// import { About } from "../../containers/About";
// import { Currency } from "../../containers/Currency";
// import { Home } from "../../containers/Home";
import { renderRoutes, IRouteConfig } from "react-router-config";

interface IRoutesProps {
    route: IRouteConfig;
}

export class App extends React.Component<IRoutesProps, {}> {
    public static async load() {
        //
    }

    public render() {
        return (
            <section>
                <Helmet title="FuseMob-SSR"/>
                <Header />
                {renderRoutes(this.props.route.routes)}
            </section>
        );
    }
}
