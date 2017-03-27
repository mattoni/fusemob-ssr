import { percent, rem } from "csx";
import * as React from "react";
import { Link } from "react-router-dom";
import { style } from "typestyle";

const navClass = style({
    width: percent(100),
});

const listClass = style({
    listStyle: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "black",
    display: "flex",
    $nest: {
        "& li": {
            float: "left",
            $nest: {
                "& a": {
                    display: "block",
                    minWidth: rem(1.4),
                    height: rem(5),
                    lineHeight: rem(5),
                    color: "white",
                    textDecoration: "none",
                    padding: rem(1),
                    $nest: {
                        "&:hover": {
                            backgroundColor: "purple",
                        },
                    },
                },
            },
        },
    },
});

export const Header = () => (
    <nav className={navClass}>
        <ul className={listClass}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/currency">Currency</Link></li>
            <li><Link to="/notreal">NotALink</Link></li>
        </ul>
    </nav>
);
