/**
 *  Configuration for fuse-box bundler
 */
import { ChildProcess, spawn } from "child_process";
import {
    EnvPlugin,
    FuseBox,
    JSONPlugin,
    UglifyJSPlugin,
} from "fuse-box";
import { watchTree } from "watch";

const isProd = process.argv.indexOf("dev") === -1;
// const VENDOR = `
//     +react
//     +react-dom
//     +mobx
//     +mobx-react
// `;

if (!isProd) {
    buildDev();
} else {
    // buildProd();
}

function buildDev() {
    let node: ChildProcess | undefined;
    const build = async () => {
        if (node) { node.kill(); }
        await bundleServer();
        node = startDevServer();
    };

    watchTree("./src/server", build);
}

// function buildProd() {

// }

// function bundleClient() {

// }

function bundleServer() {
    return new Promise((res) => FuseBox.init({
        homeDir: "src",
        outFile: "build/bundles/server.js",
        plugins: [
            EnvPlugin({ NODE_ENV: process.argv[2] }),
            JSONPlugin(),
            isProd && UglifyJSPlugin(undefined),
        ],
        sourcemaps: true,
    }).bundle(">server/index.tsx", res));
}

// function bundleVendor() {
//     FuseBox.init({
//         homeDir: "src/client",
//         log: false,
//     }).bundle({
//         [`dist/bundles/vendor.js`]: VENDOR
//     });
// }

/**
 * Start our server and monitor
 * file tree separately -- then restart
 * server if issue.
 */
function startDevServer() {
    const node = spawn("node", ["build/bundles/server.js"], {
        stdio: "inherit",
    });
    node.on("close", (code) => {
        if (code === 8) {
            console.error("Error detected, waiting for changes...");
        }
    });

    return node;
}
