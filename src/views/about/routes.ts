import { RouteConfig } from "yester";
import { RouteFunc, links, transition } from "routing";
import { IStores } from "stores";

const about: RouteFunc = (stores) => {
    const route = links.about();

    const config: RouteConfig = {
        $: route,
        enter: () => transition({
            route: route,
            stores: stores,
            nav: ["about"]
        })
    };

    return config;
};

export const routes = (stores: IStores) => ([
    about(stores),
]);
