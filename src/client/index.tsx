// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { initStores } from "../stores";
import { renderRoutes } from "react-router-config";
import "./styles";

const stores = initStores(undefined);

ReactDOM.render((
    <BrowserRouter>
        <Provider profile={initStores((window as any).__INITIAL_STATE__)}>
            {renderRoutes(stores.routing.routes)}
        </Provider>
    </BrowserRouter>
), document.getElementById("root"));

// setStatefulModules((name) => {
//     return true; ///styles/.test(name);
// });
