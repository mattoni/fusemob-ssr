import * as React from "react";
declare const FuseBox: any;

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export function fsbxResolve(name: string): Promise<React.ComponentClass<any>> {
    const moduleName = `~/containers/${name}/${name}`;
    let file = `/js/${name}.js`;

    // adjust path for server
    if (FuseBox.isServer) {
        // const path = require("path");
        file = `./public/js/${name}.js`;
        console.log(file);
    }

    const resolved = (module: IResolvedModule) => {
        console.log("MODULE: ", module);
        return module.default;
    };

    return new Promise(async (res) => {
        try {
            if (FuseBox.exists(moduleName)) {
                res(resolved(require(moduleName)));
                return;
            }

            FuseBox.import(file, () => res(resolved(require(moduleName))));
        } catch (e) {
            console.error(e);
            throw e;
        }
    });
}
