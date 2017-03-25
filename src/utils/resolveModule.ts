import * as React from "react";
declare const FuseBox: any;

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export function fsbxResolve(name: string): Promise<React.ComponentClass<any>> {
    const moduleName = `~/containers/${name}/${name}`;
    const file = `./js/${name}.js`;

    const resolved = (module: IResolvedModule) => {
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
