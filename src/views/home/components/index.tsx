import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';

@observer
export default class Home extends React.Component<{}, {}> {
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
