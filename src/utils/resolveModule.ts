import * as React from "react";
declare const FuseBox: any;

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export function fsbxResolve(name: string): Promise<React.ComponentClass<any>> {
    const moduleName = `~/containers/${name}/${name}`;
    let file = `/js/${name}.js`;

    // adjust path for server
    if (typeof document === "undefined") {
        file = `./public${file}`;
    }

    const resolved = (module: IResolvedModule) => {
        console.log("MODULE: ", module);
        return module.default;
    };

    return new Promise((res) => {
        if (FuseBox.exists(moduleName)) {
            res(resolved(require(moduleName)));
            return;
        }

        FuseBox.import(file, () => res(resolved(require(moduleName))));
    });
}
