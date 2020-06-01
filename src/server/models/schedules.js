import mongoose from "mongoose";

const Schedules = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const scheduleSchema = new Schedules({
  date: { type: Date, required: true },
  on: { type: Boolean, required: true },
  done: { type: Boolean, required: true, default: false },
  target_devices: [{ type: ObjectId, ref: "Devices" }],
});

scheduleSchema.statics.readScheduleById = async function (id) {
  //TODO
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  //remove the useless __v
  // delete result.__v;
};

scheduleSchema.statics.createSchedule = async function (scheduleDetails) {
  let { date, on, target_devices } = sensorDetails;
  //TODO
  //implement only what is destructured
  //convert elements of target_devices to objectId by using this mongoose.Types.ObjectId(element)
};

scheduleSchema.statics.deleteSchedule = async function (id) {
  //TODO
  //No Collateral Damage (Maybe Cron Job Queue)
};

const scheduleModel = mongoose.model("Areas", scheduleSchema);
export default scheduleModel;
