import * as Chalk from 'chalk';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as spdy from 'spdy';
import { appMiddleware } from './middleware';

const app = express();

// Basic settings
let port = 8080;
if (process.env.NODE_ENV === 'production') {
    port = 80;
}

// Hide this, could be security risk
app.disable('x-powered-by');

// Serve static files
const statics = path.resolve('./build/public');
app.use(express.static(statics));

// Handle requests to pages
app.get('*', appMiddleware);

const options: spdy.ServerOptions = {
    spdy: {
        plain: true,
        protocols: ['h2', 'spdy/3.1', 'spdy/3', 'http/1.1'],
    },
};

const tlsDir = process.env.TLSDIR || '/tls';
const key = process.env.TLSKEY || 'current.key';
const chain = process.env.TLSCHAIN || 'current.chain';

if (fs.existsSync(path.join(tlsDir, key))) {
    options.key = fs.readFileSync(path.join(tlsDir, key));
    options.spdy!.plain = false;
    if (process.env.NODE_ENV === 'production') {
        port = 443;
        express().get('*', (req, res, next) => {
            if (req.secure) {
                next();
            }
            // tslint:disable-next-line:no-console
            console.log(Chalk.black.bgCyan(
                `\n\n🐙  Redirecting to https://${req.hostname}`,
            ));
            res.redirect(`https://${req.hostname}`);
        }).listen(80);
    }
}

if (fs.existsSync(path.join(tlsDir, chain))) {
    options.cert = fs.readFileSync(path.join(tlsDir, chain));
}

// Start server
spdy.createServer(options, app as any).listen(port, (err: any) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        // tslint:disable-next-line:no-console
        console.log(Chalk.black.bgGreen(
            `\n\n🐙  Listening at http${!options.spdy!.plain ? 's' : ''}://:${port}\n`,
        ));
    }
});
