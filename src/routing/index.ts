import { transition } from "./stateful-funcs";
import { links } from "./links";
import { RouteConfig } from "yester";
import { IStores } from "stores";

export function NotFound(stores: IStores): RouteConfig {
    return {
        $: "*",
        enter: (props) => transition(
            { route: "*", stores: stores },
            async () => {
                stores.router.navigate(links.dashboard());
            }
        )
    };
}

export const Routes: RouteConfig[] = [

];

export { links, transition }
