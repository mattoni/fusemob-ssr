// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { percent, rem } from "csx";
import { Link } from "components/routing";
import { links } from "routing";
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
            <li><Link path ={links.home()}>Home</Link></li>
            <li><Link path={links.about()}>About</Link></li>
            <li><Link path={links.currency()}>Currency</Link></li>
            <li><Link path="/notreal">NotALink</Link></li>
        </ul>
    </nav>
);
