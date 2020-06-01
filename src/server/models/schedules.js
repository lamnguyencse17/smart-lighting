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
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

scheduleSchema.statics.createSchedule = async function (scheduleDetails) {
  let { date, on, target_devices } = sensorDetails;
  let result = await this.create({ date,on, target_devices });
  result = result.toObject();
  delete result.__v;
  return result;
};

scheduleSchema.statics.deleteSchedule = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const scheduleModel = mongoose.model("Areas", scheduleSchema);
export default scheduleModel;
