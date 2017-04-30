import { transition } from "./stateful-funcs";
import { links } from "./links";
import { RouteConfig } from "yester";
import { IStores } from "stores";
import { routes as AboutRoutes } from "views/about/routes";
import { routes as CurrencyRoutes } from "views/currency/routes";
import { routes as HomeRoutes } from "views/home/routes";

export type RouteFunc = (stores?: IStores) => RouteConfig;

function notFound(stores?: IStores): RouteConfig {
    return {
        $: "*",
        enter: () => transition(
            { route: "*", stores: stores },
            async (s) => s.status.setStatus(404)
        )
    };
}

export function Routes(stores?: IStores): RouteConfig[] {
    return [
        ...AboutRoutes(stores),
        ...CurrencyRoutes(stores),
        ...HomeRoutes(stores),
        notFound(stores)
    ];
}

export { links, transition }
