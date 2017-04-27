import { px } from "csx";
import * as React from "react";
import { style } from "typestyle";

const homeClass = style({
    padding: px(10),
});

export default class Home extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className={homeClass}>
                Home Page!!!abc123
            </div>
        );
    }
}
