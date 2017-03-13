import * as Chalk from "chalk";
import * as express from "express";
import * as path from "path";

const app = express();
const host = process.env.HOST || "localhost";
const port = 3000;

const statics = path.resolve("./build/public");
app.use(express.static(statics));

app.get("/", (req, res) => {
    const location = req.url;
    console.log("YOU ARE HERE: ", location);
    res.status(200).send(`
        <!doctype html> 
            <body> 
                <div>HELLO</div> 
                <script type="text/javascript" charset="utf-8" src="/js/bundle.js"></script>
            </body>
        </html>
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
