import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';

@observer
export class Home extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                Home Page!
            </div>
        );
    }
}
