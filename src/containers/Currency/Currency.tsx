import { px } from "csx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { style } from "typestyle";
import { IStores } from "../../stores";
import { withWork } from "../../utils/work";

const currencyClass = style({
    padding: px(10),
});

interface ICurrencyProps {
    currency?: IStores["currency"];
}

@observer
export class Currency extends React.Component<ICurrencyProps, undefined> {
    public render() {
        const { currency } = this.props;
        const rate = currency && currency.rates ? currency.rates.rates["JPY"] : "Not Found";
        return (
            <div className={currencyClass}>
                {currency && currency.loading ? "Loading..." : `USD -> JPY rate: $1 = ¥${rate}`}
            </div>
        );
    }
}

const work = withWork(Currency, async (props) => {
    // console.log("CurrencyProps", props);
    return props.currency ? props.currency.fetchRates() : null;
});

export default inject((stores: IStores) => ({
    currency: stores.currency,
}))(work);
