import * as React from "react";
import * as Helmet from "react-helmet";
import { getStyles } from "typestyle";

interface IHtmlProps {
    title?: string;
    markup: string;
}

export class Html extends React.Component<IHtmlProps, undefined> {
    public render() {
        const head = Helmet.rewind();
        const { markup } = this.props;
        const initialState = (
            <script
                dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify({})};` }}
                charSet="UTF-8"
            />
        );

        const styles = (
            <style id="styles-target">{getStyles()}</style>
        );

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    {styles}
                </head>
                <body>
                    <main id="root" dangerouslySetInnerHTML={{ __html: markup }} />
                    <script src="js/bundle.js" />
                    {initialState}
                </body>
            </html>
        );
    }
}