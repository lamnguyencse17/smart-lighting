import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { setClient, subscribeTo } from "./helpers/mqtt";
import messageHandler from "./helpers/messageHandler";
import conditionModel from "./models/conditions";
import deviceModel from "./models/devices";
import areaModel from "./models/areas";
import { startAgenda, stopAgenda, setAgenda } from "./helpers/scheduler";
import sensorModel from "./models/sensors";
import compression from "compression";

//console.log(timeConverter("2020-08-02T05:19:27.538+00:00"));

const data_uri =
  "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";

mongoose.connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

startAgenda();

const client = setClient("mqtt://23.97.56.49");
subscribeTo("Topic/Light");

client.on("message", (topic, message) => {
  messageHandler(message);
});

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("YES");
});

app.use("/api/", require("./routes/routes"));

app.listen(3000, () => console.info(`Running on 3000`));

process.on("SIGTERM", stopAgenda);
process.on("SIGINT", stopAgenda);
