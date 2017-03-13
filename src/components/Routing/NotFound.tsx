import * as React from "react";
import { Status } from "./Status";

export const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);
