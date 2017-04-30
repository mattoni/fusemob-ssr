export * from "./lazy";

import { transition } from "./stateful-funcs";
import { links } from "./links";
import { RouteConfig } from "yester";
import { IStores } from "stores";
import { routes as AboutRoutes } from "views/about/routes";
import { routes as CurrencyRoutes } from "views/currency/routes";

export type RouteFunc = (stores: IStores) => RouteConfig;

function notFound(stores: IStores): RouteConfig {
    return {
        $: "*",
        enter: () => transition(
            { route: "*", stores: stores },
            async () => {
                stores.status.setStatus(404);
                stores.router.navigate(links.home());
            }
        )
    };
}

export function Routes(stores: IStores): RouteConfig[] {
    return [
        ...AboutRoutes(stores),
        ...CurrencyRoutes(stores),
        notFound(stores)
    ];
}

export { links, transition }
