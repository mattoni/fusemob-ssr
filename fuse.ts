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

let serverBundle: Bundle;
let clientBundle: Bundle;
let fuse: FuseBox;
let options: FuseBoxOptions;

const directory = {
    homeDir: "src",
    outFolder: "build",
    js: "js"
};

Sparky.task("default", ["clean", "version-file", "options", "build", "start", "run"], () => {
    //
});

Sparky.task("start-prod", ["set-prod", "clean", "version-file", "options", "build", "start", "run"], () => {
    //
});

Sparky.task("set-prod", () => {
    env_vars.NODE_ENV = "production";
});

Sparky.task("clean", () => Sparky.src(`${directory.outFolder}/*`).clean(`${directory.outFolder}`));

Sparky.task("version-file", () => {
    const outputDir = path.join(__dirname, directory.outFolder);
    const pubDir = path.join(outputDir, "public");
    const versionFilePath = path.join(pubDir, "version.json");
    fs.mkdirSync(outputDir);
    fs.mkdirSync(pubDir);
    fs.writeFileSync(versionFilePath, JSON.stringify({ version: env_vars.VERSION }, undefined, 4));
});

Sparky.task("options", () => {
    options = {
        homeDir: directory.homeDir,
        output: `${directory.outFolder}/$name.js`,
        alias: {
            client: "~/client",
            components: "~/components",
            routing: "~/routing",
            server: "~/server",
            stores: "~/stores",
            utils: "~/utils",
            views: "~/views",
            assets: "./assets"
        },
        cache: env_vars.NODE_ENV !== "production",
        hash: env_vars.NODE_ENV === "production",
        sourceMaps: env_vars.NODE_ENV !== "production",
        plugins: [
            TypeCheckPlugin({
                bundles: [`${directory.js}/server`, `public/${directory.js}/bundle`],
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
                    outFile: `${directory.outFolder}/public/css/bundle.css` as any,
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
                    outFile: `${directory.outFolder}/public/css/bundle.css`,
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
});

Sparky.task("build", () => {
    if (env_vars.NODE_ENV === "production") {
        options.plugins!.push([
            UglifyJSPlugin()
        ]);
    }

    fuse = FuseBox.init(options);
    // Bundle
    serverBundle = fuse.bundle(`${directory.js}/server`).instructions(` > [server/index.ts]`);
    clientBundle = fuse.bundle(`public/${directory.js}/bundle`).instructions(` > [client/index.tsx]`);
    fuse.bundle(`public/${directory.js}/vendor`).instructions(" ~ client/index.tsx");
});

Sparky.task("start", () => {
    serverBundle.completed(proc => proc.start());

    if (env_vars.NODE_ENV === "development") {
        fuse.dev({ hmr: true });
        serverBundle.watch("server/**");
        clientBundle.hmr().watch();
    }
});

Sparky.task("run", () => fuse.run());
