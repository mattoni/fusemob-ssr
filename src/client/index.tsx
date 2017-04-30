// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Provider } from "mobx-react";
import * as ReactDOM from "react-dom";
import { IRenderedStates, Store, useStore } from "stores";
import { IRouterState, RouterStore } from "stores/router";
import { Routes } from "routing";
import { AppContainer } from "views";
import "./styles";

// These are the vars we stashed on the window
// Use Fusebox to pull them in dynamically
const states: IRenderedStates = require("~/rendered/state.js");

if (states.stores.status) {
    states.stores.status.client = true;
}

const store = new Store(states.stores);
const routerState = states.stores.router && states.stores.router;

let triggerOnInit = true;
if (routerState && routerState.finishedFirstLoad === true) {
    triggerOnInit = false;
}

const routeConfig: IRouterState = {
    routes: Routes(store.domains),
    config: {
        type: "browser",
        triggerOnInit: triggerOnInit
    },
    route: routerState && routerState.route
};

const router = new RouterStore(routeConfig);
store.useStore({ router: router });
store.domains.router.init();

async function renderApp() {
    const app = (
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>
    );

    ReactDOM.render(app, document.getElementById("app"));
}

renderApp();
useStore(store);

// Custom HMR, will forcefully reload if you edit a store file or
// one listed under fullPaths - Keeps state in sync
import { setStatefulModules } from "fuse-box/modules/fuse-hmr";

setStatefulModules((name) => {
    // Add the things you think are stateful:
    console.log(name, /stores/.test(name) || /client\/index/.test(name));
    return /stores/.test(name) || /client\/index/.test(name);
});
