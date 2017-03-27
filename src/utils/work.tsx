import * as React from "react";


declare const FuseBox: any;

interface IJobState {
    locked: boolean; // whether or not the work can be performed again
    completed: boolean;
    error?: string;
}

export class WorkState {
    private static jobId = 0;
    private static states: { [key: string]: IJobState } = {};

    public static getNextJobId() {
        this.jobId++;
        return this.jobId;
    }

    public static updateState(id: number, s: Partial<IJobState>) {
        if (!this.states[id]) {
            this.states[id] = { completed: false, locked: false };
        }
        for (const i in s) {
            type key = keyof IJobState;
            this.states[id][i as key] = s[i as key];
        }
    }

    public static getState(id: number) {
        return this.states[id];
    }

    public static serialize() {
        return this.states;
    }

    public static load(serialized: { [key: string]: IJobState }) {
        this.states = serialized;
    }
}

export function withWork<T>(WrappedComponent: React.ComponentClass<T>, work: (props: T) => Promise<any>) {
    const id = WorkState.getNextJobId();
    // tslint:disable-next-line:max-classes-per-file
    class Wrapper extends React.Component<T, {}> {
        constructor(props: T) {
            super(props);

            if (FuseBox.isServer) { return; }

            const state = WorkState.getState(id);

            if (state && state.locked) {
                return;
            }

            // Call work again
            work(props);
            WorkState.updateState(id, { locked: true });
        }
        // Plugin method for react-async-bootstrap
        // Called once on server/on client and will delay loading
        public async asyncBootstrapperTarget() {
            // Needs to check if server loaded this / if there was an error
            WorkState.updateState(id, { locked: true });
            if (!FuseBox.isServer) { return; }
            return work(this.props);
        }

        public componentWillUnmount() {
            // Ready to go again
            WorkState.updateState(id, { locked: false });
        }

        public render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return Wrapper;
}
