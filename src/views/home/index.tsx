import * as React from "react";
import { links } from "routing";
import { Route } from "components/routing";
import { Home } from "./home";

export class HomeRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Route component={Home} path={links.home()} />
            </div>
        );
    }
}
