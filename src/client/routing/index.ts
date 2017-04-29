import { runInAction } from "mobx";
import { forTimeToPass } from "utils";
import { IStores } from "stores";
import * as Scroll from "react-scroll";

interface TransitionOptions {
    route: string;
    stores: IStores;
    nav?: string[];
}

/**
 * Helper function to aid in transitioning between routes
 * @param route 
 * @param enter 
 * @param cb 
 */
export async function transition(options: TransitionOptions) {
    const { router } = options.stores;

    // Make sure route change and transition state
    // are updated same cycle - prevents premature loading of components
    runInAction(() => {
        router.setRoute(options.route);
    });

    await forTimeToPass(500);

    setTimeout(() => {
        if (location.hash) {
            Scroll.scroller.scrollTo(location.hash.split("#")[1], {
                duration: 1500,
                delay: 100,
                smooth: "easeInOutQuint",
            });
        }
    }, 1000);

    router.setOldPath(options.route);
}
