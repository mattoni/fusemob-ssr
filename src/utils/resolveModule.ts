import { lazyLoad } from "fuse-tools";
import { LazyModuleName } from "lazy";
import * as React from "react";

interface IResolvedModule {
    default: React.ComponentClass<any>;
}

export async function resolveModule(name: LazyModuleName): Promise<React.ComponentClass<any>> {
    const module: IResolvedModule = await lazyLoad(name);
    return module.default;
}
