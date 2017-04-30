// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { inject } from "mobx-react";
import { Component } from "react";
import { IStores } from "stores";

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    path: string;
    replace?: boolean;
    router?: IStores["router"];
}

@inject((stores: { router: IStores }) => ({
    router: stores.router
}))
export class Link extends Component<LinkProps, {}> {
    public render() {
        const { path, router, replace, onClick, ...others } = this.props;

        return (
            <a
                {...others}
                href={path}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e);
                    }
                    router && router.handleAnchorClick(e.nativeEvent, replace, path);
                }} />
        );
    }
};
