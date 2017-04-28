// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Request, Response } from "express";
import { Provider, useStaticRendering } from "mobx-react";
import { AppContainer } from "views";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
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
            <AppContainer />
        </Provider>
    );


    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={renderToString(app)}
        />,
    );

    res.status(200).send(`<!DOCTYPE html>${html}`);
}

