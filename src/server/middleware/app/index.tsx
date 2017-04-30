// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import { AppContainer } from "views";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Store } from "stores";
import { RouterStore } from "stores/router";
import { IRouterState } from "stores/router";
import { initStyles } from "utils/styles";
import { ServerHTML } from "./server-html";
import { Routes } from "routing";

// Configure mobx for rendering on the server
useStaticRendering(true);
initStyles();

export async function appMiddleware(req: Request, res: Response) {
    const store = new Store();

    const routeConfig: IRouterState = {
        routes: Routes(store.domains),
        config: {type: "mem"}
    };
    const router = new RouterStore(routeConfig);
    store.useStore({router: router});

    await store.domains.router.init(req.path);
    const app = renderToString(
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>
    );


    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={app} />
    );

    res.status(store.domains.status.status).send(`<!DOCTYPE html>${html}`);
}
