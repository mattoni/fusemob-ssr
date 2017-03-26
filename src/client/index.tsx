// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as React from "react";
import asyncBootstrapper from "react-async-bootstrapper";
import { AsyncComponentProvider, createAsyncContext } from "react-async-component";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../containers/App";
import { Store } from "../stores";
import "./styles";

// These are the vars we stashed on the window
declare var window: {
    __INITIAL_STATE__: {};
    ASYNC_COMPONENTS_STATE: {};
};

const store = new Store(window.__INITIAL_STATE__);
const asyncComponentState = window.ASYNC_COMPONENTS_STATE;
const asyncContext = createAsyncContext();

async function renderApp() {

    const app = (
        <BrowserRouter>
            <Provider profile={store.domains}>
                <AsyncComponentProvider asyncContext={asyncContext} rehydrateState={asyncComponentState}>
                    <App />
                </AsyncComponentProvider>
            </Provider>
        </BrowserRouter>
    );

    await asyncBootstrapper(app);
    ReactDOM.render(app, document.getElementById("app"));
}

renderApp();


// setStatefulModules((name) => {
//     return true; ///styles/.test(name);
// });
