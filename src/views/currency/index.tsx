import * as React from "react";
import { links } from "routing";
import { Helmet } from "react-helmet";
import { Route } from "components/routing";
import { Currency } from "./currency";

export class CurrencyRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Helmet>
                    <title>Currency</title>
                </Helmet>
                <Route component={Currency} path={links.currency()} />
            </div>
        );
    }
}
