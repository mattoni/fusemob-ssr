import { observable, action, toJS } from "mobx";

interface IStatusState {
    status: number;
    client: boolean;
}

/**
 * Handles state of the http server's status
 */
export class StatusStore {
    @observable public readonly state: IStatusState = {
        status: 200,
        client: false
    };

    constructor(state?: IStatusState) {
        if (state) {
            this.state = state;
        }
    }

    public get status() {
        return this.state.status;
    }

    public get client() {
        return this.state.client;
    }

    @action
    public setStatus(status: number) {
        this.state.status = status;
    }

    public serialize() {
        return toJS(this.state);
    }
}
