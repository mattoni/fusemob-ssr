import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import * as React from "react";
import asyncBootstrapper from "react-async-bootstrapper";
import { AsyncComponentProvider, createAsyncContext } from "react-async-component";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router-dom";
import { App } from "../../../containers/App";
import { Store } from "../../../stores";
import { initStyles } from "../../../utils/styles";
import { ServerHTML } from "./server-html";

// Configure mobx for rendering on the server
useStaticRendering(true);
initStyles();

export async function appMiddleware(req: Request, res: Response) {
    // TODO handle render without SSR in config
    const store = new Store();
    const context: StaticRouterContext = {};
    const asyncContext = createAsyncContext();

    store.domains.currency.rates

    const app = (
        <StaticRouter location={req.url} context={context}>
            <Provider profile={store.domains}>
                <AsyncComponentProvider asyncContext={asyncContext}>
                    <App />
                </AsyncComponentProvider>
            </Provider>
        </StaticRouter>
    );

    await asyncBootstrapper(app);
    const asyncState = asyncContext.getState();
    console.log("Resolved async comp");

    const html = renderToStaticMarkup(
        <ServerHTML
            asyncComponentState={asyncState}
            initialState={store.serialize()}
            appString={renderToString(app)}
        />,
    );

    if (context.url) {
        res.status(302).setHeader("Location", context.url);
        res.end();
        return;
    }

    res.status(
        context.missed
            ? 404
            : context.status || 200,
    ).send(`<!DOCTYPE html>${html}`);
}

