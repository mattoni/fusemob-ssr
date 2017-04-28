import * as React from "react";
import { HelmetComponent } from "react-helmet";
import { observer, inject } from "mobx-react";
import { IStores } from "stores";
import { Header } from "components/header";
import { NotFound, Route } from "components/routing";

interface AppContainerProps {
    router?: IStores["router"];
}

@inject((stores: IStores) => ({
    router: stores.router
}))
@observer
export class AppContainer extends React.Component<AppContainerProps, {}> {
    public render() {

        return (
            <section>
                <HelmetComponent>
                    <title>FuseMob SSR</title>
                </HelmetComponent>

                <Header />
                <Route path="*" component={NotFound} />
            </section>
        );
    }
}
