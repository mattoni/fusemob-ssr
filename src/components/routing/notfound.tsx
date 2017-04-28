import * as React from "react";

// export const NotFound = () => (
//   <Status code={404}>
//     <div>
//       <h1>Sorry, can’t find that.</h1>
//     </div>
//   </Status>
// );

interface INotFoundProps {
    staticContext: {
        status: number;
    };
}

export class NotFound extends React.Component<INotFoundProps, {}> {
    public componentWillMount() {
        const { staticContext } = this.props;
        if (staticContext) {
            staticContext.status = 404;
        }
    }

    public render() {
        return (
            <div>
                <h1>Sorry, can’t find that.</h1>
            </div>
        );
    }
};
