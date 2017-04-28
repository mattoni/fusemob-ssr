import { px } from "csx";
import * as React from "react";
import { style } from "typestyle";


const aboutClass = style({
    padding: px(10),
});

export default class About extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className={aboutClass}>
                Welcome to the about page!!!
            </div>
        );
    }
}
