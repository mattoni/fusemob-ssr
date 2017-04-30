import * as React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

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
