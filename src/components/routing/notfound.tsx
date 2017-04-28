import * as React from "react";
import { observer, inject } from "mobx-react";
import { IStores } from "stores";

interface INotFoundProps {
    statusStore?: IStores["status"];
}

@inject((stores: IStores) => ({
    statusStore: stores.status
}))
@observer
export class NotFound extends React.Component<INotFoundProps, {}> {
    public componentWillMount() {
        const { statusStore } = this.props;
        if (statusStore) {
            statusStore.setStatus(404);
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
