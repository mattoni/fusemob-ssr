import { asyncComponent } from "react-async-component";
import { resolveModule } from "../../utils/resolveModule";

export const AsyncAbout = asyncComponent({
    resolve: async () => resolveModule("about"), // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncAbout",
});
