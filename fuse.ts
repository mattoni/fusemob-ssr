import * as fs from 'fs';
import {
    CopyPlugin,
    CSSModules,
    CSSPlugin,
    CSSResourcePlugin,
    EnvPlugin,
    FuseBox,
    JSONPlugin,
    SassPlugin,
    Sparky,
    UglifyJSPlugin,
} from 'fuse-box';
import { TypeCheckPlugin } from 'fuse-box-typechecker/dist/commonjs';
import { Bundle } from 'fuse-box/dist/typings/core/Bundle';
import { FuseBoxOptions } from 'fuse-box/dist/typings/core/FuseBox';
import * as path from 'path';

// Shared async routes config
import { asyncRoutes, IAsyncRoutes } from './src/routing/async';

interface IPackageVars {
    version: string;
}

const pkg: IPackageVars = require('./package.json');
interface IEnvVars {
    VERSION: string;
    NODE_ENV: 'development' | 'production';
    YEAR: number;
}
const envVars: IEnvVars = {
    VERSION: pkg.version,
    NODE_ENV: 'development',
    YEAR: new Date().getFullYear(),
};

let serverBundle: Bundle;
let clientBundle: Bundle;
let fuse: FuseBox;
let options: FuseBoxOptions;

const directory = {
    homeDir: 'src',
    outFolder: 'build',
    js: 'js',
};

Sparky.task('default', ['clean', 'version-file', 'options', 'build', 'start', 'run'], () => {
    //
});

Sparky.task('start-prod', ['set-prod', 'clean', 'version-file', 'options', 'build', 'start', 'run'], () => {
    //
});

Sparky.task('set-prod', () => {
    envVars.NODE_ENV = 'production';
});

Sparky.task('clean', () => Sparky.src(`${directory.outFolder}/*`).clean(`${directory.outFolder}`));

Sparky.task('version-file', () => {
    const outputDir = path.join(__dirname, directory.outFolder);
    const pubDir = path.join(outputDir, 'public');
    const versionFilePath = path.join(pubDir, 'version.json');
    fs.mkdirSync(outputDir);
    fs.mkdirSync(pubDir);
    fs.writeFileSync(versionFilePath, JSON.stringify({ version: envVars.VERSION }, undefined, 4));
});

Sparky.task('options', () => {
    options = {
        homeDir: directory.homeDir,
        output: `${directory.outFolder}/$name.js`,
        alias: {
            client: '~/client',
            components: '~/components',
            routing: '~/routing',
            server: '~/server',
            stores: '~/stores',
            utils: '~/utils',
            views: '~/views',
            assets: './assets',
        },
        cache: envVars.NODE_ENV !== 'production',
        hash: envVars.NODE_ENV === 'production',
        sourceMaps: envVars.NODE_ENV !== 'production',
        plugins: [
            TypeCheckPlugin({
                bundles: [`${directory.js}/server`, `public/${directory.js}/bundle`],
                quit: envVars.NODE_ENV === 'production',
            }),
            [
                SassPlugin({
                    macros: { '~': `${directory.homeDir}/` },
                    importer: true,
                    cache: envVars.NODE_ENV !== 'production',
                }),
                CSSResourcePlugin({
                    dist: `${directory.outFolder}/assets/images`,
                    resolve: (f) => `/assets/images/${f}`,
                }),
                CSSModules(),

                CSSPlugin({
                    group: 'css/bundle.css',
                    outFile: `${directory.outFolder}/public/css/bundle.css` as any,
                    inject: false,
                    minify: envVars.NODE_ENV === 'production',
                }),
            ],
            [
                CSSModules(),
                CSSResourcePlugin({
                    dist: `${directory.outFolder}/assets/images`,
                    resolve: (f) => `/assets/images/${f}`,
                }),
                CSSPlugin({
                    group: 'css/bundle.css',
                    outFile: `${directory.outFolder}/public/css/bundle.css`,
                    inject: false,
                    minify: envVars.NODE_ENV === 'production',
                }),
            ],
            JSONPlugin(),
            CopyPlugin({
                files: ['*.jpg', '*.svg', '*.png', '*.ico'],
                useDefault: true,
                resolve: `/assets/images/`,
                dest: `/assets/images`,
            }),
            EnvPlugin(envVars),
        ],
    };
});

Sparky.task('build', () => {
    if (envVars.NODE_ENV === 'production') {
        options.plugins!.push([
            UglifyJSPlugin(),
        ]);
    }

    fuse = FuseBox.init(options);
    // Bundle
    serverBundle = fuse.bundle(`${directory.js}/server`).instructions(` > [server/index.ts]`);
    fuse.bundle(`public/${directory.js}/vendor`).instructions(' ~ client/index.tsx');


    clientBundle = fuse.bundle(`public/${directory.js}/bundle`);
    clientBundle.splitConfig({
        browser: `/${directory.js}`,
        server: `build/public/${directory.js}`,
        dest: `public/${directory.js}`,
    });

    // Async splitting
    for (const bundleName in asyncRoutes) {
        if (!asyncRoutes.hasOwnProperty(bundleName)) {
            continue;
        }
        const bundle = asyncRoutes[bundleName as IAsyncRoutes];

        clientBundle = clientBundle.split(bundle.instructions, `${bundleName} > ${bundle.entrypoint}`);
    }
    clientBundle.instructions(`> [client/index.tsx] + [views/**/**.tsx]`);
});

Sparky.task('start', () => {
    if (envVars.NODE_ENV === 'development') {
        fuse.dev({ hmr: true, httpServer: false });
        serverBundle.watch('server/**');
        clientBundle.hmr().watch();
    }

    serverBundle.completed((proc) => proc.start());
});

Sparky.task('run', () => fuse.run());
