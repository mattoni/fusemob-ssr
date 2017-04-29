import { RouteConfig } from "yester";
import { RouteFunc, links, transition } from "routing";
import { IStores } from "stores";

const about: RouteFunc = (stores) => {
    const route = links.about();

    const run = () => transition({
        route: route,
        stores: stores,
        nav: ["about"]
    });

    const config: RouteConfig = {
        $: route
    };

    if (stores.status.client) {
        config.enter = run;
    } else {
        config.beforeEnter = run;
    }

    return config;
};

export const routes = (stores: IStores) => ([
    about(stores),
]);
