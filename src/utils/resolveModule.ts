import { lazyLoad } from "fuse-tools";
import { LazyModuleName, LazyModulePaths } from "routing";
import * as React from "react";

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export async function resolveModule(name: LazyModuleName): Promise<React.ComponentClass<any>> {
    const module: IResolvedModule = await lazyLoad(LazyModulePaths[name]);
    return module.default;
}
