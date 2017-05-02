import { lazyLoad } from 'fuse-tools';
import { toJS } from 'mobx';
import { IAsyncRoutes } from 'routing/async';

interface IBundlesState {
    bundles: { [key: string]: any };
}

export class BundlesStore {
    public readonly state: IBundlesState;

    constructor(state?: IBundlesState) {
        this.state = state || {
            bundles: {},
        };
    }

    public async loadBundle(name: IAsyncRoutes) {
        if (this.state.bundles[name]) {
            return;
        }

        this.state.bundles[name] = await lazyLoad(name);
    }

    public async preloadBundlesFromServer() {
        const promises = [];
        // tslint:disable-next-line:forin
        for (const b in this.state.bundles) {
            this.state.bundles[b] = undefined;
            promises.push(this.loadBundle(b as IAsyncRoutes));
        }

        return Promise.all(promises);
    }

    public getBundle(name: IAsyncRoutes) {
        return this.state.bundles[name];
    }

    public serialize() {
        return toJS(this.state);
    }
}
