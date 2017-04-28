import * as React from "react";
import { getStyles } from "typestyle";


interface IHtmlProps {
    description: string;
    appString: string;
    bodyElements: JSX.Element[];
}

export class Html extends React.Component<IHtmlProps, undefined> {
    public render() {
        const { appString, bodyElements } = this.props;

        // Pass generated styles to client
        const styles = (
            <style id="styles-target">{getStyles()}</style>
        );

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="msapplication-TileColor" content="#4a9dd7" />
                    <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
                    <meta name="theme-color" content="#4a9dd7" />
                    {styles}
                </head>
                <body>
                    <main id="app" dangerouslySetInnerHTML={{ __html: appString }} />
                    <script src="/vendor.js" />
                    {bodyElements}
                    <script src="/bundle.js" />
                </body>
            </html>
        );
    }
}
