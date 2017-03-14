import { inject } from "mobx-react";
import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
import { IStores } from "../../stores";


interface IAsyncLoadable extends React.ComponentClass<any> {
    load: (stores: IStores) => Promise<any>;
}

interface IAsyncRouteProps extends RouteProps {
    component: IAsyncLoadable;
    stores?: IStores;
}

/**
 * Registers a component's async load() method for server rendering
 */
@inject((stores: IStores) => stores)
export class AsyncRoute extends React.Component<IAsyncRouteProps, {}> {
    constructor(p: IAsyncRouteProps) {
        super(p);
        if (p.stores) {
            p.stores.routing.registerLoader(
                p.component.load.bind(p.stores),
            );
        }
    }

    public render() {
        return <Route path={this.props.path} component={this.props.component} />;
    }
}
