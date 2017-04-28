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

let server = false;
let bundle: Bundle;
let fuse: FuseBox;
let options: FuseBoxOptions;
let build: string;

const directory = {
    homeDir: "src",
    outFolder: "server-build",
    js: "js"
};

Sparky.task("server-start", ["clean", "version-file", "setup-server", "options", "build", "start"], () => {
    //
});

Sparky.task("server-build", ["set-prod", "clean", "version-file", "setup-server", "options", "build"], () => {
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

Sparky.task("setup-server", () => {
    server = true;
});

Sparky.task("setup-client", () => {
    server = false;
    directory.outFolder = "client-build";
});

Sparky.task("options", () => {
    options = {
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

    options["serverBundle"] = server;
});

Sparky.task("build", () => {
    if (env_vars.NODE_ENV === "production") {
        options.plugins!.push([
            UglifyJSPlugin()
        ]);
    }

    fuse = FuseBox.init(options);
    // Bundle
    if (server) {
        bundle = fuse.bundle(`${directory.js}/bundle`).instructions(` > [server/index.ts]`);
        fuse.bundle(`${directory.js}/vendor`).instructions(" ~ server/index.ts");
    } else {
        bundle = fuse.bundle(`${directory.js}/bundle`).instructions(` > [server/index.ts]`);
        fuse.bundle(`${directory.js}/vendor`).instructions(" ~ server/index.ts");
    }
    fuse.run();
});

Sparky.task("start", () => {
    bundle.completed(proc => proc.start());
    server ? bundle.watch("server/**") : bundle.watch("client/**");
});
