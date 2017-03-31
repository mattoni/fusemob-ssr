import { asyncComponent } from "react-async-component";
import { resolveModule } from "../../utils/resolveModule";

export const AsyncHome = asyncComponent({
    resolve: async () => resolveModule("home"), // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncHome",
});
