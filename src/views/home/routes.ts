import { links, RouteFunc, transition } from 'routing';
import { IStores } from 'stores';

const home: RouteFunc = (stores) => {
    const route = links.home();

    return {
        $: route,
        enter: () => transition({
            route,
            module: 'home',
            stores,
            nav: ['home'],
        }),
    };
};

export const routes = (stores?: IStores) => ([
    home(stores),
]);
