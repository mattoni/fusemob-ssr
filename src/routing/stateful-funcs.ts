import { runInAction } from 'mobx';
import * as Scroll from 'react-scroll';
import { IAsyncRoutes } from 'routing/async';
import { getStore, IStores } from 'stores';

interface ITransitionOptions {
    route: string;
    module?: IAsyncRoutes;
    nav?: string[];
    stores?: IStores;
}

type TransitionFunc = (m: IStores) => Promise<any>;

/**
 * Helper function to aid in transitioning between routes
 * @param route
 * @param enter
 * @param cb
 */
export async function transition(options: ITransitionOptions, ...cb: TransitionFunc[]) {
    const stores = options.stores || getStore().domains;
    const { router } = stores;

    // Make sure route change and transition state
    // are updated same cycle - prevents premature loading of components
    runInAction(() => {
        router.setRoute(options.route);
        if (router.client) {
            router.setTransitioning(true);
        }
    });

    const promises = [
        ...cb.map((c) => c(stores)),
    ];

    if (options.module) {
        promises.push(stores.bundles.loadBundle(options.module));
    }

    await Promise.all(promises);

    if (router.client) {
        router.setTransitioning(false);
        setTimeout(() => {
            if (location.hash) {
                Scroll.scroller.scrollTo(location.hash.split('#')[1], {
                    duration: 1500,
                    delay: 100,
                    smooth: 'easeInOutQuint',
                });
            }
        }, 1000);
    }

    router.setOldPath(options.route);
}
