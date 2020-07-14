import mongoose from "mongoose";

const Schedules = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const scheduleSchema = new Schedules({
  schedule: { type: Date, required: true },
  isOn: { type: Boolean, required: true },
  value: { type: Number, requires: true },
  done: { type: Boolean, default: false },
  device_id: { type: String },
});

scheduleSchema.statics.readScheduleById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

scheduleSchema.statics.readScheduleByDeviceId = async function (name) {
  let result = await this.find({ device_id: name }).lean();
  delete result.__v;
  return result;
};

scheduleSchema.statics.createSchedule = async function (scheduleDetails) {
  let { schedule, isOn, value, device_id } = scheduleDetails;
  let result = await this.create({ schedule, isOn, device_id, value });
  result = result.toObject();
  delete result.__v;
  return result;
};

scheduleSchema.statics.deleteSchedule = async function (id) {
  let result = await this.findByIdAndDelete(mongoose.Types.ObjectId(id));
  delete result.__v;
  return result;
};

const scheduleModel = mongoose.model("Schedules", scheduleSchema);
export default scheduleModel;
