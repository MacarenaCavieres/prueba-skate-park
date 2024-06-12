import "dotenv/config";
import express from "express";
import path from "path";
import viewsRoute from "./routes/views.route.js";
import { fileConfig } from "./utils/file.config.js";
import { engine } from "express-handlebars";

const app = express();

const __dirname = import.meta.dirname;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(fileConfig);
app.use("/", viewsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
