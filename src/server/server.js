import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
// import path from "path";
// import dotenv from "dotenv";

const data_uri =
  "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/test?retryWrites=true&w=majority";
// dotenv.config({ path: path.resolve(process.cwd(), ".env") });
mongoose.connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("YES");
});

app.use("/api/", require("./routes/routes"));

app.listen(3000, () => console.info(`Running on 3000`));
