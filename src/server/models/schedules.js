import mongoose from "mongoose";

const Schedules = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const scheduleSchema = new Schedules({
  date: { type: Date, required: true },
  on: { type: Boolean, required: true },
  done: { type: Boolean, required: true },
  target_devices: [{ type: ObjectId, ref: "Devices" }],
});
