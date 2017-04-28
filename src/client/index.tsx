// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as ReactDOM from "react-dom";
import { IRenderedStates, Store } from "../stores";
import { AppContainer } from "views";
import "./styles";

// These are the vars we stashed on the window
// Use Fusebox to pull them in dynamically
const states: IRenderedStates = require("~/rendered/state.js");

const store = new Store(states.stores);

async function renderApp() {
    const app = (
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>
    );

    ReactDOM.render(app, document.getElementById("app"));
}

renderApp();

setStatefulModules((name) => {
    // Add the things you think are stateful:
    console.log(name, /stores/.test(name) || /client\/index/.test(name));
    return /stores/.test(name) || /client\/index/.test(name);
});
