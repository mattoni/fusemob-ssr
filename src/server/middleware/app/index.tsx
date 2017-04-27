import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import * as React from "react";
import asyncBootstrapper from "react-async-bootstrapper";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
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

    const app = (
        <Provider {...store.domains}>
            <App />
        </Provider>
    );


    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={renderToString(app)}
        />,
    );

    // if (context.url) {
    //     res.status(302).setHeader("Location", context.url);
    //     res.end();
    //     return;
    // }

    res.status(context.status || 200).send(`<!DOCTYPE html>${html}`);
}

