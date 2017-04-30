import { px } from "csx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { style } from "typestyle";
import { IStores } from "stores";

const currencyClass = style({
    padding: px(10),
});

const moneyClass = style({
    color: "green",
});

interface ICurrencyProps {
    currency?: IStores["currency"];
}

@inject((stores: IStores) => ({
    currency: stores.currency
}))
@observer
export class Currency extends React.Component<ICurrencyProps, undefined> {
    public render() {
        const { currency } = this.props;
        const rate = currency && currency.rates ? currency.rates.rates["JPY"] : "Not Found";
        const content = currency && currency.loading
            ? "Loading..."
            : <span>USD -> JPY rate: $1 = <strong className={moneyClass}>¥{rate}</strong></span>;
        return (
            <div className={currencyClass}>
                {content}
            </div>
        );
    }
}
