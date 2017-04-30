import * as React from "react";
import { links } from "routing";
import { Route } from "components/routing";
import { Currency } from "./currency";

export class CurrencyRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Route component={Currency} path={links.currency()} />
            </div>
        );
    }
}
