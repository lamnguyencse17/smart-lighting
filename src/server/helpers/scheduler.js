import Agenda from "agenda";
import scheduleModel from "../models/schedules";
import { publishTo } from "./mqtt";
import deviceModel from "../models/devices";

const data_uri =
  "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";

let agenda;

export const startAgenda = async () => {
  agenda = new Agenda({
    db: { address: data_uri, collection: "agenda" },
    processEvery: "10 seconds",
    maxConcurrency: 20,
  });
  agenda.on("ready", async () => {
    console.log("AGENDA READY");
    await agenda.start();
  });
  agenda.on("fail", (err, job) => {
    console.log(`Job failed with error: ${err.message}`);
  });

  agenda.on("complete", (job) => {
    //handle done here
    // job name = _id of schedule
    console.log(`Job ${job.attrs.name} finished`);
  });
};

export const setAgenda = async (id) => {
  let result = await scheduleModel.readScheduleById(id);
  let { value, device_id, isOn, schedule } = result;
  // let time = await timeConverter(schedule);
  await agenda.define(id, async (job) => {
    if (isOn == true) {
      let values = [isOn ? "1" : "0", `${value}`];
      publishTo([
        {
          device_id: device_id,
          values,
        },
      ]);
    } else {
      publishTo([{ device_id: device_id, values: ["0", "0"] }]);
    }
    await deviceModel.updateToDeviceId(device_id, value, isOn);
  });
  await agenda.schedule(time, id);
};

export const cancelAgenda = async (id) => {
  await agenda.cancel({ name: id });
};

export const stopAgenda = async () => {
  await agenda.stop();
  process.exit(0);
};
