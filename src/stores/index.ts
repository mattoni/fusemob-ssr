import "isomorphic-fetch";
import { CurrencyStore } from "./currency";
/**
 * Available stores. Add new store definitions here
 */
export interface IStores {
    currency: CurrencyStore;
    [key: string]: {serialize: () => void, state: any};
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
    asyncComponents: {};
    asyncWork: {};
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
        };
    }

    public serialize() {
        const serialized: ISerializedState = {};
        for (const i in this.domains) {
            serialized[i] = this.domains[i].serialize();
        }

        return serialized;
    }
}
