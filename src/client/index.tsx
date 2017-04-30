// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Provider } from "mobx-react";
import * as ReactDOM from "react-dom";
import { IRenderedStates, Store, useStore } from "stores";
import { Routes } from "routing";
import { AppContainer } from "views";
import "./styles";

// These are the vars we stashed on the window
// Use Fusebox to pull them in dynamically
const states: IRenderedStates = require("~/rendered/state.js");

if (states.stores.status) {
    states.stores.status.client = true;
}

const routerState = states.stores.router && states.stores.router;
if (routerState) {
    routerState.config.triggerOnInit = routerState.finishedFirstLoad !== true;
    routerState.finishedFirstLoad = false;
    routerState.routes = Routes();
    routerState.config.type = "browser";
}

const store = new Store(states.stores);
useStore(store);

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

// Custom HMR, will forcefully reload if you edit a store file or
// one listed under fullPaths - Keeps state in sync
import { setStatefulModules } from "fuse-box/modules/fuse-hmr";

setStatefulModules((name) => {
    // Add the things you think are stateful:
    console.log(name, /stores/.test(name) || /client\/index/.test(name));
    return /stores/.test(name) || /client\/index/.test(name);
});
