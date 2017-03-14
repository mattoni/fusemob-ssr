import * as Chalk from "chalk";
import * as express from "express";
import { Provider } from "mobx-react";
import * as path from "path";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router-dom";
import { App } from "../containers/App";
import { Html } from "../containers/Html";
import { hydrate } from "../stores";
import { PromiseDefer } from "../utils/promise-defer";

const app = express();
const host = process.env.HOST || "localhost";
const port = 3000;

const statics = path.resolve("./build/public");
app.use(express.static(statics));

app.get("*", async (req, res) => {
    const context: StaticRouterContext = {};
    // init stores
    const stores = hydrate(undefined);
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider profile={stores}>
                <App />
            </Provider>
        </StaticRouter>,
    );

    // Wait for all async  ops to complete
    await PromiseDefer.exec();

    res.status(context.status || 200).send(renderHTML(markup));
});

app.listen(port, host, (err: any) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n🐙  Listening at http://${host}:${port}\n`,
        ));
    }
});

function renderHTML(markup: string) {
    const html = ReactDOMServer.renderToString(
        <Html markup={markup} />,
    );

    return `<!doctype html> ${html}`;
}


