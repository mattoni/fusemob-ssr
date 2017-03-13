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
import * as rimraf from "rimraf";
import { watchTree } from "watch";

const isProd = process.argv.indexOf("dev") === -1;
const outDir = "build";
const outFiles = {
    server: `${outDir}/server.js`,
    client: `${outDir}/public/js/bundle.js`,
};
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

async function buildDev() {
    let node: ChildProcess | undefined;
    await clean();
    const build = async () => {
        if (node) { node.kill(); }
        await bundleServer();
        node = startDevServer();
    };

    await bundleClient();

    // setStatefulModules((name) => {
    //     return name === "client";
    // });

    watchTree("./src/server", build);
}

// function buildProd() {

// }

function bundleClient() {
    return new Promise((res) => {
        const fb = FuseBox.init({
            homeDir: "src",
            outFile: outFiles.client,
            plugins: [
                EnvPlugin({ NODE_ENV: process.argv[2] }),
                JSONPlugin(),
                isProd && UglifyJSPlugin(undefined),
            ],
            sourcemaps: true,
        });

        // If dev, start websocket server
        if (!isProd) {
            fb.devServer(">client/index.tsx", {
                httpServer: false,
            });

            res();
            return;
        }

        // Otherwise, bundle it up!
        fb.bundle(">client/index.tsx", res);
    });
}

function bundleServer() {
    return new Promise((res) => FuseBox.init({
        homeDir: "src",
        outFile: outFiles.server,
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
 * Start our server in separate thread
 */
function startDevServer() {
    const node = spawn("node", [outFiles.server], {
        stdio: "inherit",
    });
    node.on("close", (code) => {
        if (code === 8) {
            console.error("Error detected, waiting for changes...");
        }
    });

    return node;
}

function clean() {
    return new Promise((res) => {
        rimraf(outDir, res);
    });
}
