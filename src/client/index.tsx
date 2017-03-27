// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as React from "react";
import asyncBootstrapper from "react-async-bootstrapper";
import { AsyncComponentProvider, createAsyncContext } from "react-async-component";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../containers/App";
import { IRenderedStates, Store } from "../stores";
import { WorkState } from "../utils/work";
import "./styles";

// These are the vars we stashed on the window

const states: IRenderedStates = require("~/rendered/states.js");

const store = new Store(states.stores);
const asyncContext = createAsyncContext();

WorkState.load(states.asyncWork);

async function renderApp() {

    const app = (
        <BrowserRouter>
            <Provider {...store.domains}>
                <AsyncComponentProvider asyncContext={asyncContext} rehydrateState={states.asyncComponents}>
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
//   // Add the things you think are stateful:
//   console.log(name, /stores/.test(name) || /client\/index/.test(name));
//   return /stores/.test(name) || /client\/index/.test(name);
// });
