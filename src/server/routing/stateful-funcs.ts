import { IStores } from "stores";

interface TransitionOptions {
    route: string;
    stores: IStores;
}

/**
 * Helper function to aid in transitioning between routes
 * @param route 
 * @param enter 
 * @param cb 
 */
export async function transition(options: TransitionOptions, ...cb: ((m: IStores) => Promise<any>)[]) {
    const { router } = options.stores;

    router.setRoute(options.route);

    await Promise.all([
        ...cb.map(c => c(options.stores))
    ]);

    router.setOldPath(options.route);
}
