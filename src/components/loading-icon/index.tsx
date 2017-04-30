import * as React from "react";
import { observer } from "mobx-react";
import { cssRaw } from "typestyle";
import { styles } from "./styles";

interface LoadingIconProps {
    fullscreen?: boolean;
}
@observer
export class LoadingIcon extends React.Component<LoadingIconProps, {}> {
    public componentWillMount() {
        cssRaw(styles);
    }

    public render() {
        const { fullscreen } = this.props;
        return (
            <div className={`".loadingAnimation ${fullscreen ? ".main" : ""}`}>
                <div className={`.icon`} />
            </div>
        );
    }
}
