import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import * as React from "react";
import { withAsyncComponent } from "react-async-component";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router-dom";
import { Store } from "../../../stores";

// Configure mobx for rendering on the server
useStaticRendering(true);

export async function appMiddleware(req: Request, res: Response) {
    // TODO handle render without SSR in config
    const store = new Store();
    const context: StaticRouterContext = {};

    const app = (
        <StaticRouter location={req.url} context={context}>
            <Provider profile={store}>
                Test
            </Provider>
        </StaticRouter>
    );

    const { appWithAsyncComponents, state, STATE_IDENTIFIER } = await withAsyncComponent(app);
    const html = renderToStaticMarkup(
        
    );

    res.status(context.status || 200).send(renderHTML(markup));
}

