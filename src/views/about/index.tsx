import * as React from "react";
import { links } from "routing";
import { Route } from "components/routing";
import { About } from "./about";

export class AboutRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Route component={About} path={links.about()} />
            </div>
        );
    }
}
