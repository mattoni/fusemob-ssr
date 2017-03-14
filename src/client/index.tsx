// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../containers/App";
import { hydrate } from "../stores";
import "./styles";

ReactDOM.render((
    <BrowserRouter>
        <Provider profile={hydrate((window as any).__INITIAL_STATE__)}>
            <App />
        </Provider>
    </BrowserRouter>
), document.getElementById("root"));

// setStatefulModules((name) => {
//     return true; ///styles/.test(name);
// });
