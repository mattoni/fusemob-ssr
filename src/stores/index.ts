import "isomorphic-fetch";
import { CurrencyStore } from "./currency";
import { RoutingStore } from "./routing";

type ISerializedState = {
    [P in keyof IStores]: any;
};

let stores: IStores;

/**
 * Available stores
 */
export interface IStores {
    currency: CurrencyStore;
    routing: typeof RoutingStore;
}

/**
 * Get stores object. Either initialize to default or from serialized state.
 */
export function hydrate(state: ISerializedState | undefined): IStores {
    stores = {
        currency: new CurrencyStore(state ? state.currency : undefined),
        routing: RoutingStore,
    };

    return stores;
}

/**
 * Serialize state and export
 */
export function dehydrate(): ISerializedState {
    if (!stores) {
        throw new Error("Stores have not been initialized. Cannot deserialize. Call hydrate() first");
    }

    return {
        currency: stores.currency.serialize(),
        routing: undefined, // no state for routing
    };
}
