import { observable, action, toJS } from "mobx";
import { Router, RouteConfig, RouterConfig } from "yester";

export interface IRouterState {
    config: RouterConfig;
    routes: RouteConfig[];

    route?: string;
    transitioning?: boolean;
    lastRoute?: string;
    finishedFirstLoad?: boolean;
    oldPath?: string;
}

/**
 * Handles state of routing for route components. 
 */
export class RouterStore {
    @observable public readonly state: IRouterState = {
        config: { type: "mem" },
        routes: [],

        route: undefined,
        transitioning: true,
        lastRoute: undefined,
        finishedFirstLoad: false,
        oldPath: undefined
    };

    private router: Router;
    constructor(state?: IRouterState) {
        if (state) {
            this.state = state;
        }
        this.router = new Router(this.state.routes, this.state.config);
    }

    public get route() {
        return this.state.route;
    }

    public get oldPath() {
        return this.state.oldPath;
    }

    public get lastRoute() {
        return this.state.lastRoute;
    }

    public get isTransitioning() {
        return this.state.transitioning;
    }

    public get finishedFirstLoad() {
        return this.state.finishedFirstLoad;
    }

    public navigate(path: string, replace?: boolean) {
        if (this.oldPath === path) {
            return;
        }
        this.router.navigate(path, replace);
    }

    public forceNav(path: string) {
        window.location.pathname = path;
    }

    public handleAnchorClick(e: Event | MouseEvent, replace?: boolean, pathOverride?: string) {
        e.preventDefault();
        if (this.oldPath === pathOverride) {
            return;
        }
        this.router.handleAnchorClick(e, replace, pathOverride);
    }

    @action
    public addRoute(route: RouteConfig) {
        this.state.routes.push(route);
        this.router.routes.push(route);
    }

    public async init(preload?: () => Promise<void>) {
        if (this.state.finishedFirstLoad) {
            return;
        }

        if (preload) {
            await preload();
        }

        await this.router.init();

        // After initial render
        this.finishFirstLoad();
    }

    @action
    public setRoute(r: string) {
        this.state.lastRoute = this.state.route;
        this.state.route = r;
    }

    @action
    public setOldPath(path: string) {
        this.state.oldPath = path;
    }

    @action
    public setTransitioning(t: boolean) {
        if (!this.finishedFirstLoad) {
            return;
        }

        this.state.transitioning = t;
    }

    public serialize() {
        return toJS(this.state);
    }

    /**
     * Used to determine whether this is an initial load
     * or if the main bundle has been initialized
     */
    @action
    private finishFirstLoad() {
        this.state.finishedFirstLoad = true;
        this.state.transitioning = false;
    }
}
