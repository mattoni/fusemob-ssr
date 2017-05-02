import 'isomorphic-fetch';
import { BundlesStore } from './bundles';
import { CurrencyStore } from './currency';
import { RouterStore } from './router';

export interface ISerializable {
    serialize: () => any;
    state: any;
}

/**
 * Available stores. Add new store definitions here
 */
export interface IStores {
    currency: CurrencyStore;
    router: RouterStore;
    bundles: BundlesStore;
}

/**
 * Serialized state has same keys as actual state
 * No need to modify this.
 */
export type ISerializedState = {
    [P in keyof IStores]?: IStores[P]['state'];
};

/**
 * State sent to the browser
 */
export interface IRenderedStates {
    stores: ISerializedState;
}

/**
 * The master state class
 */
export class Store {
    public readonly domains: IStores;

    constructor(state?: ISerializedState) {
        // Add new state domain initializations here
        this.domains = {
            bundles: new BundlesStore(state && state.bundles),
            currency: new CurrencyStore(state && state.currency),
            router: new RouterStore(state && state.router),
        };
    }

    public useStores(stores: Partial<IStores>) {
        // tslint:disable-next-line:forin
        for (const key in stores) {
            const store = stores[key];
            if (store) {
                this.domains[key] = store;
            }
        }
    }

    public serialize() {
        const serialized: ISerializedState = {};
        // tslint:disable-next-line:forin
        for (const i in this.domains) {
            serialized[i] = this.domains[i].serialize();
        }

        return serialized;
    }
}

/**
 * Allow store to be set + accessible outside of UI
 */
let store: Store;
export function useStore(s: Store) {
    store = s;
}

export function getStore() {
    return store;
}
