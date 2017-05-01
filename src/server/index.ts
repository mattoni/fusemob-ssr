import * as Chalk from 'chalk';
import * as express from 'express';
import * as path from 'path';
import { appMiddleware } from './middleware';
import './process.js';

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

// Start server
app.listen(port, host, (err: any) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        // tslint:disable-next-line:no-console
        console.log(Chalk.black.bgGreen(
            `\n\n🐙  Listening at http://${host}:${port}\n`,
        ));
    }
});




