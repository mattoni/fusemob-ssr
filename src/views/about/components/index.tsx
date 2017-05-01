import { px } from 'csx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { style } from 'typestyle';

@observer
export default class About extends React.Component<{}, {}> {
    public render() {
        const aboutClass = style({
            padding: px(10),
        });

        return (
            <div className={aboutClass}>
                <Helmet>
                    <title>About</title>
                </Helmet>
                Welcome to the about page!!!
            </div>
        );
    }
}
