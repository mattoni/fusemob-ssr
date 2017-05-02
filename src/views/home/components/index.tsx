import { px } from 'csx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { style } from 'typestyle';

@observer
export default class Home extends React.Component<{}, {}> {
    public render() {
        const homeClass = style({
            padding: px(10),
        });

        return (
            <div className={homeClass}>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                Home Page!
            </div>
        );
    }
}
