// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import { AppContainer } from "views";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Store } from "stores";
import { IRouterState } from "stores/router";
import { initStyles } from "utils/styles";
import { ServerHTML } from "./server-html";
import { Routes, NotFound } from "server/routing";

// Configure mobx for rendering on the server
useStaticRendering(true);
initStyles();

export async function appMiddleware(req: Request, res: Response) {
    
    const routeConfig: IRouterState = {
        routes: Routes,
        config: {type: "mem"}
    };
    const store = new Store({router: routeConfig});
    store.domains.router.addRoute(NotFound(store.domains));
    store.domains.router.init();

    const app = (
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>
    );


    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={renderToString(app)} />,
    );

    res.status(store.domains.status.status).send(`<!DOCTYPE html>${html}`);
}
