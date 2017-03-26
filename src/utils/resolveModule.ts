import * as path from "path";
import * as React from "react";

declare const FuseBox: any;

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export function fsbxResolve(name: string): Promise<React.ComponentClass<any>> {
    const moduleName = `~/containers/${name}/${name}`;
    let file = `/js/${name}.js`;

    const resolved = (module: IResolvedModule) => {
        return module.default;
    };

    return new Promise(async (res) => {
        try {
            if (FuseBox.exists(moduleName)) {
                res(resolved(require(moduleName)));
                return;
            }
            if (FuseBox.isServer) {
                file = path.resolve(`./build/public/js/${name}.js`);
                require(file);
                return res(resolved(require(moduleName)));
            }
            FuseBox.import(file, () => res(resolved(require(moduleName))));
        } catch (e) {
            console.error(e);
            throw e;
        }
    });
}
