import { observable, action, toJS } from "mobx";

interface IStatusState {
    status: number;
}

/**
 * Handles state of the http server's status
 */
export class StatusStore {
    @observable public readonly state: IStatusState = {
        status: 200
    };

    public get status() {
        return this.state.status;
    }

    @action
    public setStatus(status: number) {
        this.state.status = status;
    }

    public serialize() {
        return toJS(this.state);
    }
}
