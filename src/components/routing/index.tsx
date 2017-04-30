export * from "./link";
export * from "./notfound";

// tslint:disable-next-line:no-unused-variable
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
        
        if (this.shouldShowLoader()) {
            return <span>Loading...</span>;
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

    private shouldShowLoader() {
        const { path, router } = this.props;
        if (!router || !router.route) {
            return false;
        }

        // Don't show if no transition is happening
        if (!router.isTransitioning || !router.finishedFirstLoad) {
            return false;
        }

        // if the path matches directly
        // show the loading icon
        if (typeof path === "string") {
            return path === router.route;
        }


        // If array of paths, dont show loading icon if the last
        // route was one we  render for. i.e. - if we are transitioning between
        // sub routes, no need to show loading icon here.
        if (router.lastRoute && path.indexOf(router.lastRoute) !== -1) {
            return false;
        };

        // finally, if the route is in our array, show the loading icon
        return path.indexOf(router.route) !== -1;
    }
};
