import { asyncComponent } from "react-async-component";
import { fsbxResolve } from "../../utils/resolveModule";

export const AsyncAbout = asyncComponent({
    resolve: async () => fsbxResolve("About"), // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncAbout",
});
