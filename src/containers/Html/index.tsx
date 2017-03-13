import * as React from "react";
import * as Helmet from "react-helmet";

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

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                </head>
                <body>
                    <main id="root" dangerouslySetInnerHTML={{ __html: markup }} />
                    {initialState}
                </body>
            </html>
        );
    }
}