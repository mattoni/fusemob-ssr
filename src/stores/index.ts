import "isomorphic-fetch";
import { CurrencyStore } from "./currency";
import { RouterStore } from "./router";
import { StatusStore } from "./status";

export interface Serializable {
    serialize: () => any;
    state: any;
}

/**
 * Available stores. Add new store definitions here
 */
export interface IStores {
    currency: CurrencyStore;
    status: StatusStore;
    router: RouterStore;
    [key: string]: Serializable;
}

/**
 * Serialized state has same keys as actual state
 * No need to modify this.
 */
export type ISerializedState = {
    [P in keyof IStores]?: IStores[P]["state"];
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
            currency: new CurrencyStore(state && state.currency),
            status: new StatusStore(state && state.status),
            router: new RouterStore(state && state.router)
        };
    }

    public useStores(stores: Partial<IStores>) {
        for (const key in stores) {
            const store = stores[key];
            if (store) {
                this.domains[key] = store;
            }
        }
    }

    public serialize() {
        const serialized: ISerializedState = {};
        for (const i in this.domains) {
            serialized[i] = this.domains[i].serialize();
        }

        return serialized;
    }
}

let store: Store;
export function useStore(s: Store) {
    store = s;
}

export function getStore() {
    return store;
}
