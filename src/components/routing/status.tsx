import * as React from "react";

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
