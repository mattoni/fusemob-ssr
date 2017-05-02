// tslint:disable-next-line:no-unused-variable
import { inject } from 'mobx-react';
import * as React from 'react';
import { Component } from 'react';
import { IStores } from 'stores';

export interface ILinkProps extends React.HTMLProps<HTMLAnchorElement> {
    path: string;
    replace?: boolean;
    router?: IStores['router'];
}

@inject((stores: { router: IStores }) => ({
    router: stores.router,
}))
export class Link extends Component<ILinkProps, {}> {
    public render() {
        const { path, router, replace, onClick, ...others } = this.props;

        return (
            <a
                {...others}
                href="#"
                onClick={this.handleClick} />
        );
    }

    private handleClick = (e: React.MouseEvent<any>) => {
        const { path, router, replace, onClick, ...others } = this.props;

        if (onClick) {
            onClick(e);
        }

        return router && router.handleAnchorClick(e.nativeEvent, replace, path);
    }
};
