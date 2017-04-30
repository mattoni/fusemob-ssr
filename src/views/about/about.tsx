import { px } from "csx";
import * as React from "react";
import { style } from "typestyle";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";


const aboutClass = style({
    padding: px(10),
});

@observer
export class About extends React.Component<{}, undefined> {
    public render() {
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
