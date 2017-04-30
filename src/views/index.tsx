import * as React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { Header } from "components/header";
import { NotFound, Route } from "components/routing";
import { AboutRoutes } from "./about";
import { CurrencyRoutes } from "./currency";
import { HomeRoutes } from "./home";

@observer
export class AppContainer extends React.Component<{}, {}> {
    public render() {
        return (
            <section>
                <Helmet>
                    <title>FuseMob SSR</title>
                </Helmet>
                <Header />
                <AboutRoutes />
                <CurrencyRoutes />
                <HomeRoutes />
                <Route path="*" component={NotFound} />
            </section>
        );
    }
}
