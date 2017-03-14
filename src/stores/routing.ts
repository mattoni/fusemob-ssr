type ILoader = () => Promise<void>;

/**
 * Keeps track of promises issued to load a container.
 * Used in server response deferment - waits until all resolve
 * before sending response
 */
export class RoutingStore {
    private static loaders: ILoader[] = [];

    public static registerLoader(func: ILoader) {
        if (typeof document === "undefined") {
            this.loaders.push(func);
            return;
        }

        func();
    }

    public static execLoaders() {
        return Promise.all(this.loaders).then(() => this.loaders = []);
    }
}
