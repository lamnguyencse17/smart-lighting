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
    { readings: { $slice: -5 } }
  )
    .populate({
      path: "conditions",
      select: "comparison isOn value sensorValue area device",
      populate: {
        path: "device",
        select: "device_id -_id",
        option: { lean: true },
      },
      option: { lean: true },
    })
    .lean();
  delete result.__v;
  return result;
};

sensorSchema.statics.getConditionsByDeviceId = async function (id) {
  let result = await this.findOne({ device_id: id })
    .populate({
      path: "conditions",
      select: "comparison isOn value sensorValue area device",
      populate: {
        path: "device",
        select: "device_id -_id",
        option: { lean: true },
      },
      option: { lean: true },
    })
    .select("conditions");
  console.log(result);
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
  console.log({ device_id, value });
  let now = moment().toString(); // get local time
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
    { new: true, upsert: true }
  ).exec();
};

sensorSchema.statics.addCondition = async function (sensorId, conditionId) {
  await this.updateOne(
    { _id: mongoose.Types.ObjectId(sensorId) },
    {
      $push: {
        conditions: conditionId,
      },
    }
  );
};

sensorSchema.statics.removeCondition = async function(sensorId, conditionId){
  let result = await this.findOneAndUpdate(
    {_id: mongoose.Types.ObjectId(sensorId)},
    {
      $pull:{'conditions': mongoose.Types.ObjectId(conditionId)}
    }
  ); 
  delete result.__v;
  return result;
}

sensorSchema.statics.getReadingsByDuration = async function (id, duration) {
  let result = await this.findOne({
    _id: mongoose.Types.ObjectId(id),
  });
  let returnArray = result.readings.filter((reading) => {
    let d = new Date(reading.date);
    let time = parseInt((Date.now() - d.getTime()) / 1000);
    switch (duration) {
      case 0:
        return time <= 86400;
      case 1:
        return 86400 < time && time <= 259200;
      case 2:
        return 172800 < time && time <= 432000;
    }
  });
  return returnArray;
};

sensorSchema.statics.deleteSensor = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const sensorModel = mongoose.model("Sensors", sensorSchema);
export default sensorModel;
