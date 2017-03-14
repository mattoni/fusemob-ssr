import { px } from "csx";
import * as React from "react";
import { Link } from "react-router-dom";
import { style } from "typestyle";

const headerClass = style({
    $nest: {
        "& ul": {
            listStyle: "none",
            padding: 0,
        },
        "& li": {
            display: "inline",
            padding: px(5),
            backgroundColor: "green",
        },
    },
});

export const Header = () => (
    <nav className={headerClass}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
);
