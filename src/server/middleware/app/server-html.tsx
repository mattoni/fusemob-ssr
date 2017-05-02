import { Html } from 'components/html';
import * as path from 'path';
import * as React from 'react';
import { IRenderedStates, ISerializedState } from 'stores';

const description = 'A server side rendering implementation featuring fuse-box and MobX';

interface IBundleFiles {
    bundle: string;
    vendor: string;
}

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

const bundleFiles: IBundleFiles = require(path.resolve('./build/bundles.json'));

export function ServerHTML(props: IServerHTMLProps) {
    const { initialState, appString } = props;
    if (initialState.router) {
        // clear out routes
        initialState.router.routes = [];
        delete initialState.router.config;
    }
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
            bundle={`/js/${bundleFiles.bundle}`}
            vendor={`/js/${bundleFiles.vendor}`} />
    );
}
