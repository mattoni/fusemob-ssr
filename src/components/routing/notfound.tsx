import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';

@observer
export class NotFound extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Helmet>
                    <title>Not Found</title>
                </Helmet>
                <h1>Sorry, can’t find that.</h1>
            </div>
        );
    }
};
