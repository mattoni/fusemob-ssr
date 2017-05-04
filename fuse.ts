import * as fs from 'fs';
import {
    CopyPlugin,
    EnvPlugin,
    FuseBox,
    JSONPlugin,
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

Sparky.task('prod-build', ['set-prod', 'clean', 'version-file', 'options', 'build', 'run'], () => {
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
            plugins: '~/plugins',
            assets: './assets',
        },
        cache: envVars.NODE_ENV !== 'production',
        hash: envVars.NODE_ENV === 'production',
        plugins: [
            TypeCheckPlugin({
                bundles: ['server'],
                quit: envVars.NODE_ENV === 'production',
            }),
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

    // Vendor bundle
    fuse.bundle(`public/${directory.js}/vendor`).instructions('~client/index.tsx');

    // Server Bundle
    serverBundle = fuse.bundle('server').splitConfig({
        server: `build/public/${directory.js}`,
        dest: `public/${directory.js}`,
    });

    // Client Bundle
    clientBundle = fuse.bundle(`public/${directory.js}/bundle`).splitConfig({
        browser: `/${directory.js}`,
        dest: `public/${directory.js}`,
    });

    // Async splitting
    for (const bundleName in asyncRoutes) {
        if (!asyncRoutes.hasOwnProperty(bundleName)) {
            continue;
        }
        const bundleInfo = asyncRoutes[bundleName as IAsyncRoutes];

        serverBundle = serverBundle.split(bundleInfo.instructions, `${bundleName} > ${bundleInfo.entrypoint}`);
        clientBundle = clientBundle.split(bundleInfo.instructions, `${bundleName} > ${bundleInfo.entrypoint}`);
    }

    serverBundle.instructions(` > [server/index.ts] +process +[views/**/**.tsx]`);
    clientBundle.instructions(` > [client/index.tsx] +[views/**/**.tsx]`);
});

Sparky.task('start', () => {
    if (envVars.NODE_ENV === 'development') {
        fuse.dev({ hmr: true, httpServer: false });
        serverBundle.watch('server/**');
        clientBundle.hmr().watch();
    }

    serverBundle.completed((proc) => proc.start());
});

Sparky.task('run', async () => {
    const producer = await fuse.run();
    const bundle = producer.bundles.get(`public/${directory.js}/bundle`);
    const vendor = producer.bundles.get(`public/${directory.js}/vendor`);
    const bundles = {
        bundle: bundle!.context.output.lastGeneratedFileName,
        vendor: vendor!.context.output.lastGeneratedFileName,
    };
    const outputDir = path.join(__dirname, directory.outFolder);
    fs.writeFileSync(path.join(outputDir, 'bundles.json'), JSON.stringify(bundles));
});
