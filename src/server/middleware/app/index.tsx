// tslint:disable-next-line:no-unused-variable
import { Request, Response } from 'express';
import { Provider, useStaticRendering } from 'mobx-react';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Routes } from 'routing';
import { Store } from 'stores';
import { RouterStore } from 'stores/router';
import { IRouterState } from 'stores/router';
import { initStyles } from 'utils/styles';
import { AppContainer } from 'views';
import { ServerHTML } from './server-html';

// Configure mobx for rendering on the server
useStaticRendering(true);

export async function appMiddleware(req: Request, res: Response) {
    initStyles();

    const store = new Store();

    const routeConfig: IRouterState = {
        routes: Routes(store.domains),
        config: {type: 'mem'},
    };

    const router = new RouterStore(routeConfig);
    store.useStores({router});
    await store.domains.router.init(req.path);

    const app = renderToString(
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>,
    );

    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={app} />,
    );

    res.status(store.domains.router.status || 200).send(`<!DOCTYPE html>${html}`);
}
