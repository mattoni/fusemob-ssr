import {
    FuseBox,
} from "fsbx";

// const isProd = process.argv.indexOf("dev") === -1;

const directory = {
    root: "build",
    js: "public/js",
};

const fuse = FuseBox.init({
    homeDir: "src",
    output: `${directory.root}/$name.js`,
});

const lazyLoad = [
    "containers/About/About.tsx",
];

// LazyLoad Bundles
lazyLoad.forEach((bundle) => {
    const name = bundle.split("/").reverse()[0].split(".")[0];
    fuse.bundle(`${directory.js}/${name}`)
        .watch()
        .hmr()
        .instructions(`! [${bundle}]`);
});


// Vendor Bundle
fuse.bundle(`${directory.js}/vendor`)
    .watch()
    .hmr()
    .instructions(" ~ client/index.tsx");

// Client Bundle
fuse.bundle(`${directory.js}/bundle`)
    .watch()
    .hmr()
    .sourceMaps(true)
    .instructions(" !> [client/index.tsx] - About.tsx");

// Server Bundle
fuse.bundle("server")
    .watch("server/**")
    .instructions(" > [server/index.tsx]")
    .completed((proc) => proc.start());

fuse.dev({ port: 4444, httpServer: false });
fuse.run();
