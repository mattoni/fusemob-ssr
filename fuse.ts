import {
    FuseBox,
    Sparky,
    UglifyJSPlugin,
    SassPlugin,
    CSSModules,
    CSSResourcePlugin,
    CSSPlugin,
    JSONPlugin,
    CopyPlugin,
    EnvPlugin
} from "fuse-box";
import { TypeCheckPlugin } from "fuse-box-typechecker/dist/commonjs";
import * as fs from "fs";
import { FuseBoxOptions } from "fuse-box/dist/typings/core/FuseBox";
import { Bundle } from "fuse-box/dist/typings/core/Bundle";
import * as path from "path";

interface PackageVars {
    version: string;
}

const pkg: PackageVars = require("./package.json");
interface EnvVars {
    VERSION: string;
    NODE_ENV: "development" | "production";
    YEAR: number;
}
let env_vars: EnvVars = {
    VERSION: pkg.version,
    NODE_ENV: "development",
    YEAR: new Date().getFullYear()
};


let build: string;
let clientBundle: Bundle;
let fuse: FuseBox;

const directory = {
    homeDir: "src",
    outFolder: "build",
    js: "public/js",
};

Sparky.task("default", ["clean", "version-file", "setup-build", "", "run"], () => {

});

Sparky.task("build", ["set-prod", "clean", "version-file", "setup-build", "run"], () => {
    //
});

Sparky.task("set-prod", () => {
    env_vars.NODE_ENV = "production";
});

Sparky.task("clean", () => Sparky.src(`${directory.outFolder}/*`).clean(`${directory.outFolder}`));

Sparky.task("version-file", () => {
    build = path.join(__dirname, directory.outFolder);
    const versionFilePath = path.join(build, "version.json");
    fs.mkdirSync(build);
    fs.writeFileSync(versionFilePath, JSON.stringify({ version: env_vars.VERSION }, undefined, 4));
});

Sparky.task("setup-build", () => {
    let options: FuseBoxOptions = {
        homeDir: directory.homeDir,
        output: `${directory.outFolder}/$name.js`,
        alias: {
            client: "~/client",
            components: "~/components",
            server: "~/server",
            stores: "~/stores",
            utils: "~/utils",
            views: "~/views",
            assets: "./assets"
        },
        cache: env_vars.NODE_ENV !== "production",
        hash: env_vars.NODE_ENV === "production",
        plugins: [
            TypeCheckPlugin({
                bundles: [`${directory.js}/bundle`],
                quit: env_vars.NODE_ENV === "production",
            }),
            [
                SassPlugin({
                    macros: { "~": `${directory.homeDir}/` },
                    importer: true,
                    cache: env_vars.NODE_ENV !== "production",
                }),
                CSSResourcePlugin({
                    dist: `${directory.outFolder}/assets/images`,
                    resolve: (f) => `/assets/images/${f}`,
                }),
                CSSModules(),

                CSSPlugin({
                    group: "css/bundle.css",
                    outFile: `${directory.outFolder}/css/bundle.css` as any,
                    inject: false,
                    minify: env_vars.NODE_ENV === "production"
                })
            ],
            [
                CSSModules(),
                CSSResourcePlugin({
                    dist: `${directory.outFolder}/assets/images`,
                    resolve: (f) => `/assets/images/${f}`,
                }),
                CSSPlugin({
                    group: "css/bundle.css",
                    outFile: `${directory.outFolder}/css/bundle.css`,
                    inject: false,
                    minify: env_vars.NODE_ENV === "production"
                })
            ],
            JSONPlugin(),
            CopyPlugin({
                files: ["*.jpg", "*.svg", "*.png", "*.ico"],
                useDefault: true,
                resolve: `/assets/images/`,
                dest: `/assets/images`
            }),
            EnvPlugin(env_vars),
        ]
    };

    if (env_vars.NODE_ENV === "production") {
        options.plugins!.push([
            UglifyJSPlugin()
        ]);
    }

    fuse = FuseBox.init(options);

    // Vendor Bundle
    const vendorBundle = fuse.bundle(`${directory.js}/vendor`);

    clientBundle = fuse.bundle(`${directory.js}/bundle`);
    vendorBundle.instructions(" ~ index.tsx");
    clientBundle.instructions(`> [index.tsx]`);
});

Sparky.task("serve-dev", () => {

    fuse.dev({ root: false, port: 4444, hmr: true }, server => {
        const app: express.Application = server.httpServer.app;
        app.use(express.static(build));
        app.get("*", function (req, res) {
            res.sendFile(path.join(build, "index.html"));
        });
    });

    clientBundle.hmr().watch();
});
