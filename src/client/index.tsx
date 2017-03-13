import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../containers/App";
import { setStylesTarget } from "typestyle";
// import { setStatefulModules } from "fuse-box/modules/fuse-hmr";


if (process.env.NODE_ENV !== "dev") {
    setStylesTarget({ textContent: "styles-target" });
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById("root"));

// setStatefulModules((name) => {
//     return /client/.test(name);
// });
