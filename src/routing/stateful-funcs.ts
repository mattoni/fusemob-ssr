import { runInAction } from "mobx";
import { forTimeToPass } from "utils";
import { IStores } from "stores";
import * as Scroll from "react-scroll";

interface TransitionOptions {
    route: string;
    nav?: string[];
    stores: IStores;
}

/**
 * Helper function to aid in transitioning between routes
 * @param route 
 * @param enter 
 * @param cb 
 */
export async function transition(options: TransitionOptions, ...cb: ((m: IStores) => Promise<any>)[]) {
    const { router, status } = options.stores;

    // Make sure route change and transition state
    // are updated same cycle - prevents premature loading of components
    runInAction(() => {
        router.setRoute(options.route);
        if (status.client) {
            router.setTransitioning(true);
        }
    });

    const promises = [
        ...cb.map(c => c(options.stores))
    ];

    if (status.client) {
        // extra delay to avoid loading screen instant flash
        promises.push(forTimeToPass(500));
    }

    await promises;

    if (status.client) {
        router.setTransitioning(false);
        setTimeout(() => {
            if (location.hash) {
                Scroll.scroller.scrollTo(location.hash.split("#")[1], {
                    duration: 1500,
                    delay: 100,
                    smooth: "easeInOutQuint",
                });
            }
        }, 1000);
    }

    router.setOldPath(options.route);
}
