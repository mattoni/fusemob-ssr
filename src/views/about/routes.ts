import { links, RouteFunc, transition } from 'routing';
import { IStores } from 'stores';

const about: RouteFunc = (stores) => {
    const route = links.about();
    return {
        $: route,
        enter: () => transition(
            {
                route,
                module: 'about',
                stores,
                nav: ['about'],
            },
        ),
    };
};

export const routes = (stores?: IStores) => ([
    about(stores),
]);
