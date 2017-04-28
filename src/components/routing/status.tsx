import * as React from "react";
import { Route, StaticRouterContext } from "react-router-dom";

interface IStatusProps {
    code: number;
    children?: any;
}

export const Status = (props: IStatusProps) => (
    <Route render={render(props)} />
);

function render({ code, children }: IStatusProps) {
    return (staticContext: StaticRouterContext) => {
        if (staticContext) {
            staticContext.status = code;
        }

        return children;
    };
}
