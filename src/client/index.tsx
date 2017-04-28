// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IRenderedStates, Store } from "../stores";
import { App } from "components/app";
import "./styles";

// These are the vars we stashed on the window
// Use Fusebox to pull them in dynamically
const states: IRenderedStates = require("~/rendered/state.js");

const store = new Store(states.stores);
const asyncContext = createAsyncContext();

async function renderApp() {
    const app = (
        <BrowserRouter>
            <Provider {...store.domains}>
                <App />
            </Provider>
        </BrowserRouter>
    );

    ReactDOM.render(app, document.getElementById("app"));
}

renderApp();

// setStatefulModules((name) => {
//   // Add the things you think are stateful:
//   console.log(name, /stores/.test(name) || /client\/index/.test(name));
//   return /stores/.test(name) || /client\/index/.test(name);
// });
