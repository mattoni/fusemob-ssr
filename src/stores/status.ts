import { observable, action, toJS } from "mobx";

interface State {
    status: number;
}

/**
 * Handles state of routing for route components. 
 */
export class StatusStore {
    @observable public readonly state: State = {
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
