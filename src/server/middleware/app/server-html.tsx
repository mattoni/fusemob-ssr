import * as React from "react";
import { AsyncState } from "react-async-component";
import { Html } from "../../../containers/Html";
import { IRenderedStates, ISerializedState } from "../../../stores";
import { WorkState } from "../../../utils/work";

const description = "A server side rendering implementation featuring fuse-box and MobX";

interface IServerHTMLProps {
    asyncComponentState: AsyncState;
    initialState: ISerializedState;
    appString: string;
}

const KeyedComponent = ({ children }: { children?: any }) => {
    return React.Children.only(children);
};

const inlineScript = (body: string) => (
    <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: body }}
    />
);

export function ServerHTML(props: IServerHTMLProps) {
    const { asyncComponentState, initialState, appString } = props;
    const bodyElements = [];
    const state: IRenderedStates = {
        asyncComponents: asyncComponentState,
        asyncWork: WorkState.serialize(),
        stores: initialState,
    };

    bodyElements.push(inlineScript(
        `FuseBox.dynamic('rendered/states.js', 'module.exports=${JSON.stringify(state)}');`,
    ));

    const formattedBodyElements = bodyElements.map((x, idx) => <KeyedComponent key={idx}>{x}</KeyedComponent>);

    return (
        <Html
            appString={appString}
            description={description}
            bodyElements={formattedBodyElements}
        />
    );
}
