import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { setClient, subscribeTo } from "./helpers/mqtt";
import messageHandler from "./helpers/messageHandler";
import moment from "moment";
// import path from "path";
// import dotenv from "dotenv";

const data_uri =
  "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";
// dotenv.config({ path: path.resolve(process.cwd(), ".env") });
mongoose.connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const client = setClient("mqtt://23.97.56.49");
subscribeTo("Topic/Light");

client.on("message", (topic, message) => {
  // message is Buffer
  // message = JSON.parse(message);
  // let { device_id, value } = message;
  // sensorSchema.updateSensor({ device_id, value });
  messageHandler(message);
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
