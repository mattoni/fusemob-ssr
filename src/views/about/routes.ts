import { lazyLoad } from 'fuse-tools';
import { links, RouteFunc, transition } from 'routing';
import { IStores } from 'stores';

const about: RouteFunc = (stores) => {
    const route = links.about();
    return {
        $: route,
        enter: () => transition(
            {
                route,
                stores,
                nav: ['about'],
            },
            async () => {
                lazyLoad('about');
            },
        ),
    };
};

export const routes = (stores?: IStores) => ([
    about(stores),
]);
