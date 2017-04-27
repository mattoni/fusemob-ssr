import { FuseBox } from "fuse-box";
import { LazyModuleName, LazyModulePaths } from "./lazy";

// const isProd = process.argv.indexOf("dev") === -1;

const dirs = {
    root: "build",
    js: "public/js",
};

const fuse = FuseBox.init({
    homeDir: "src",
    output: `${dirs.root}/$name.js`,
    hash: false, // unless prod
});

// Vendor Bundle
fuse.bundle(`${dirs.js}/vendor`)
    .watch()
    .hmr()
    .sourceMaps(true)
    .instructions(" ~ client/index.tsx");

// Client Bundle
const client = fuse.bundle(`${dirs.js}/bundle`)
    .splitConfig({ browser: `js/bundles`, dest: `${dirs.js}/bundles/` });

for (const path in LazyModulePaths) {
    const route = LazyModulePaths[path as LazyModuleName];
    const fixme = route.split(".tsx");
    fixme.pop();
    client
        .split(`${fixme}.jsx`, `${path} > ${route}`);
}

client.watch()
    .hmr()
    .sourceMaps(true)
    .instructions(`> [client/index.tsx] +[views/**/**.*]`);

// Server Bundle
fuse.bundle("server")
    .watch("server/**")
    .instructions(" > [server/index.tsx]")
    .completed((proc) => proc.start());

fuse.dev({ port: 4444, httpServer: false });
fuse.run();
