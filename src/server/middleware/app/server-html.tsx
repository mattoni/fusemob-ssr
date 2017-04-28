import * as React from "react";
import { Html } from "components/html";
import { IRenderedStates, ISerializedState } from "stores";

const description = "A server side rendering implementation featuring fuse-box and MobX";

interface IServerHTMLProps {
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
    const { initialState, appString } = props;
    const bodyElements = [];
    const state: IRenderedStates = {
        stores: initialState,
    };

    bodyElements.push(inlineScript(
        `FuseBox.dynamic('rendered/state.js', 'module.exports=${JSON.stringify(state)}');`,
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
