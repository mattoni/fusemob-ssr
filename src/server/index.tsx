import * as Chalk from "chalk";
import { App } from "containers/App";
import { Html } from "containers/Html";
import * as express from "express";
import * as path from "path";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router-dom";

const app = express();
const host = process.env.HOST || "localhost";
const port = 3000;

const statics = path.resolve("./build/public");
app.use(express.static(statics));

app.get("/", (req, res) => {
    const context: StaticRouterContext = {};
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>,
    );

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

