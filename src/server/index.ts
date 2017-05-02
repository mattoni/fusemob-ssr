import * as Chalk from 'chalk';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as spdy from 'spdy';
import { appMiddleware } from './middleware';

const app = express();

// Basic settings
let port = 8080;
const host = process.env.HOST || 'localhost';
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
}

if (fs.existsSync(path.join(tlsDir, chain))) {
    options.key = fs.readFileSync(path.join(tlsDir, chain));
    options.spdy!.plain = false;
}

// Start server
spdy.createServer(options, app as any).listen(port, host, (err: any) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        // tslint:disable-next-line:no-console
        console.log(Chalk.black.bgGreen(
            `\n\n🐙  Listening at http://${host}:${port}\n`,
        ));
    }
});
