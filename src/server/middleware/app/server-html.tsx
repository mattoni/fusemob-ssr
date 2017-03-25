import * as React from "react";
import { AsyncState } from "react-async-component";
import { Html } from "../../../containers/Html";
import { ISerializedState } from "../../../stores";

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

    bodyElements.push(inlineScript(
        `window.ASYNC_COMPONENTS_STATE=${JSON.stringify(asyncComponentState)};`,
    ));

    bodyElements.push(inlineScript(
        `window.__INITIAL_STATE__=${JSON.stringify(initialState)}`,
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
