// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../containers/App";
import "./styles";

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById("root"));

// setStatefulModules((name) => {
//     return true; ///styles/.test(name);
// });
