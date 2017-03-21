import * as React from "react";
import { IResultProps } from "react-async-component";
import { ISerializedState } from "../../../stores";
import { Html } from "../../../components/Html";

interface IServerHTMLProps {
    asyncComponents: IResultProps;
    initialState: ISerializedState;
}

const inlineScript = (body: string) => (
    <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: body }}
    />
);

export function generateServerHTML(props: IServerHTMLProps) {
    const { asyncComponents, initialState } = props;
    const asyncComponentState = inlineScript(
        `window.${asyncComponents.STATE_IDENTIFIER}=${JSON.stringify(asyncComponents.state)};`,
    );
    const initialState = inlineScript(
        `window.__INITIAL_STATE__=${JSON.stringify(initialState)}`,
    );

}
