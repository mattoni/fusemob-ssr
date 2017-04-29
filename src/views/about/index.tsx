import * as React from "react";
import { asyncComponent } from "react-async-component";
import { resolveModule } from "utils/resolveModule";
import { links } from "routing";
import { Route } from "components/routing";

const AsyncAbout = asyncComponent({
    resolve: async () => resolveModule("about"), // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncAbout",
});

export class AboutRoutes extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Route component={AsyncAbout} path={links.about()} />
            </div>
        );
    }
}
