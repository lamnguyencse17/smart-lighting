import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import mqtt from "mqtt";
// import path from "path";
// import dotenv from "dotenv";

const data_uri =
  "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";
// dotenv.config({ path: path.resolve(process.cwd(), ".env") });
mongoose.connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const client = mqtt.connect("mqtt://23.97.56.49");

client.on("connect", function () {
  client.subscribe("presence", function (err) {
    if (err) {
      console.log(err);
    } else {
      client.subscribe("test");
      client.publish("test", "Testing");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(topic.toString());
  console.log(message.toString());
  client.end();
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
