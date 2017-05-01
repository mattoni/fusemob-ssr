import { Header } from 'components/header';
import { NotFound, Route } from 'components/routing';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { links } from 'routing';

@observer
export class AppContainer extends React.Component<{}, {}> {
    public render() {
        return (
            <section>
                <Helmet>
                    <title>FuseMob SSR</title>
                </Helmet>
                <Header />

                <Route path={links.home()} asyncComponent="home" />
                <Route path={links.about()} asyncComponent="about" />
                <Route path={links.currency()} asyncComponent="currency" />
                <Route path="*" component={NotFound} />

            </section>
        );
    }
}
