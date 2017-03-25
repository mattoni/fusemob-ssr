import { px } from "csx";
import { inject } from "mobx-react";
import * as React from "react";
import { style } from "typestyle";
import { IStores } from "../../stores";

const currencyClass = style({
    padding: px(10),
});

interface ICurrencyProps {
    currency?: IStores["currency"];
}

@inject((stores: IStores) => ({
    currency: stores.currency,
}))
export class Currency extends React.Component<ICurrencyProps, undefined> {
    public static async load(stores: IStores) {
        return stores.currency.fetchRates();
    }

    public render() {
        const { currency } = this.props;
        const rate = currency && currency.rates ? currency.rates.rates["JPY"] : "Not Found";
        return (
            <div className={currencyClass}>
                USD -> JPY rate: $1 = ¥{rate}
            </div>
        );
    }
}
