import { links, RouteFunc, transition } from 'routing';
import { IStores } from 'stores';

const currency: RouteFunc = (stores) => {
    const route = links.currency();

    return {
        $: route,
        enter: () => transition(
            {
                route,
                stores,
                nav: ['currency']
            },
            (s) => s.currency.fetchRates(),
        ),
    };
};

export const routes = (stores?: IStores) => ([
    currency(stores),
]);
