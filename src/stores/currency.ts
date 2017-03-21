import { action, observable, toJS } from "mobx";

interface ICurrencyState {
    rates: ICurrencyResponse | undefined;
    error: any;
}

interface ICurrencyResponse {
    base: string;
    date: string;
    rates: { [key: string]: number };
}

export class CurrencyStore {

    @observable public readonly state: ICurrencyState;

    constructor(state?: ICurrencyState) {
        if (state) {
            this.state = state;
            return;
        }

        this.state = {
            rates: undefined,
            error: undefined,
        };
    }

    public get rates(): Readonly<ICurrencyState["rates"]> {
        return this.state.rates;
    }

    @action
    public async fetchRates() {
        const resp = await fetch("https://api.fixer.io/latest?base=USD");
        if (!resp.ok) {
            this.setState("error", await resp.json());
            console.error("Unable to fetch rates");
            return;
        }

        const val: ICurrencyResponse = await resp.json();

        this.setState("rates", val);
    }

    public serialize() {
        return toJS(this.state);
    }

    @action
    protected setState<T extends ICurrencyState, K extends keyof ICurrencyState>(key: K, val: T[K]) {
        this.state[key] = val;
    }
}
