import { asyncComponent } from "react-async-component";
import { About } from "./About";

export const AsyncAbout = asyncComponent({
    resolve: async () => {
        console.log("Loading About");
        return About;
    }, // Need to load module dynamically here
    ssrMode: "boundary",
    name: "AsyncAbout",
});
