import { px } from "csx";
import * as React from "react";
import { style } from "typestyle";
import { observer } from "mobx-react";


const aboutClass = style({
    padding: px(10),
});

@observer
export class About extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className={aboutClass}>
                Welcome to the about page!!!
            </div>
        );
    }
}
