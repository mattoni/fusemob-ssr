import { IRouteConfig } from "react-router-config";
import { About } from "../containers/About";
import { App } from "../containers/App";
import { Home } from "../containers/Home";

interface IRouteComponent extends React.ComponentClass<any> {
    load: () => Promise<any>;
}

interface IRoutes extends IRouteConfig {
    component: IRouteComponent;
}

export class RoutingStore {
    public static routes: IRoutes[] = [{
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home,
            },
            {
                path: "/about",
                component: About,
            },
        ],
    }];
}
