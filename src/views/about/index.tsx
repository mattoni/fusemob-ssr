import * as React from "react";
import { links } from "routing";
import { Helmet } from "react-helmet";
import { Route } from "components/routing";
import { About } from "./about";

export class AboutRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Helmet>
                    <title>About</title>
                </Helmet>
                <Route component={About} path={links.about()} />
            </div>
        );
    }
}
