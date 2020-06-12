import mongoose from "mongoose";
import moment from "moment";

const Sensors = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const sensorSchema = new Sensors({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  readings: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
  conditions: [{ type: ObjectId, ref: "Conditions" }],
});

sensorSchema.statics.readSensorById = async function (id) {
  let result = await this.findOne(
    { _id: mongoose.Types.ObjectId(id) },
    { readings: { $slice: 5 } }
  ).lean();
  delete result.__v;
  return result;
};

sensorSchema.statics.createSensor = async function (sensorDetails) {
  let { name, device_id } = sensorDetails;
  let result = await this.create({ name, device_id });
  result = result.toObject();
  delete result.__v;
  return result;
};

sensorSchema.statics.updateSensor = function (sensorDetails) {
  let { device_id, value } = sensorDetails;
  let now = moment().toString(); // get local time
  console.log(now)
  let result = this.findOneAndUpdate(
    { device_id },
    {
      $push: {
        readings: {
          date: now,
          value: value,
        },
      },
    },
    { new: true }
  ).exec();
};

sensorSchema.statics.deleteSensor = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const sensorModel = mongoose.model("Sensors", sensorSchema);
export default sensorModel;
