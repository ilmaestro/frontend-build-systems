import * as express from "express";
import * as path from "path";
import * as http from "http";
const PORT = 9001;

// middleware
const app: express.Application = express();
app.use("/", express.static(path.join(__dirname, "../wwwroot")));
app.use("/node_modules", express.static(path.join(__dirname, "../../node_modules")));
app.use("/app", express.static(path.join(__dirname, "../wwwroot/app")));

// http server
app.set("port", PORT);
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});