import * as Chalk from "chalk";
import * as express from "express";

const app = express();
const host = process.env.HOST || "localhost";
const port = 3000;

app.get("*", (req, res) => {
    const location = req.url;
    console.log("YOU ARE HERE: ", location);
    res.status(200).send(`
        <!doctype html> <div>HELLO</div>
    `);
});

app.listen(port, host, (err: any) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n🐙  Listening at http://${host}:${port}\n`,
        ));
    }
});
