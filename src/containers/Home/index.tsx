import { asyncComponent } from "react-async-component";
import { fsbxResolve } from "../../utils/resolveModule";

export const AsyncHome = asyncComponent({
    resolve: async () => fsbxResolve("Home"), // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncHome",
});
