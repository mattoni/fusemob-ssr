import { RouteFunc, links, transition } from "routing";
import { IStores } from "stores";

const currency: RouteFunc = (stores) => {
    const route = links.currency();

    return {
        $: route,
        enter: () => transition({
            route: route,
            stores: stores,
            nav: ["currency"]
        }, () => stores.currency.fetchRates())
    };
};

export const routes = (stores: IStores) => ([
    currency(stores)
]);
