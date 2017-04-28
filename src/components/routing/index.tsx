export * from "./status";
export * from "./notfound";
export * from "./link";

import * as React from "react";
import { Component, } from "react";
import { observer, inject } from "mobx-react";
import { IStores } from "stores";

export interface RouteProps {
    path: string | string[];
    component: React.SFC<any | void> | React.ComponentClass<any | void>;
    router?: IStores["router"];
}

@inject((stores: IStores) => ({
    router: stores.router
}))
@observer
export class Route extends Component<RouteProps, {}> {
    public render() {
        const { router, component: Component } = this.props;

        if (!router) {
            console.warn("No router configured");
            return null;
        }

        if (!this.isMatch()) {
            return null;
        }

        return <Component />;
    }

    private isMatch() {
        const { path, router } = this.props;
        if (!router) {
            return false;
        }

        if (typeof path === "string") {
            return path === router.route;
        }

        if (!router.route) {
            return false;
        }

        return path.indexOf(router.route) !== -1;
    }
};
