import { createAsyncComponent } from "react-async-component";
import { Currency } from "./Currency";

export default createAsyncComponent({
  resolve: () => Currency.load(),
  ssrMode: "boundary",
  name: "AsyncHome",
});
