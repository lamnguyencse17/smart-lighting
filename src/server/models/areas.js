import mongoose from "mongoose";

const Areas = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const areaSchema = new Areas({
  name: { type: String, required: true },
  sensors: [{ type: ObjectId, ref: "Sensors" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
  conditions: [{ type: ObjectId, ref: "Conditions" }],
});

areaSchema.statics.readAreaById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) })
    .populate({
      path: "sensors",
      select: "name device_id readings _id",
      option: { lean: true },
    })
    .populate({
      path: "devices",
      select: "name device_id history _id",
      option: { lean: true },
    })
    .populate({
      path: "conditions",
      select: "comparison isOn area device value sensor sensorValue",
      option: { lean: true },
    })
    .lean();
  delete result.__v;
  return result;
};

areaSchema.statics.createArea = async function (areaDetails) {
  let { name, sensors, devices } = areaDetails;
  let result = await this.create({ name, sensors, devices });
  result = result.toObject();
  delete result.__v;
  return result;
};

areaSchema.statics.deleteArea = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

areaSchema.statics.addCondition = async function (areaId, conditionId) {
  await this.updateOne(
    { _id: mongoose.Types.ObjectId(areaId) },
    {
      $push: {
        conditions: conditionId,
      },
    }
  );
};

areaSchema.statics.removeCondition = async function(areaId, conditionId){
  let result = await this.findOneAndUpdate(
    {_id: mongoose.Types.ObjectId(areaId)},
    {
      $pull:{'conditions': mongoose.Types.ObjectId(conditionId)}
    }
  );
  delete result.__v;
  return result;
}

const areaModel = mongoose.model("Areas", areaSchema);
export default areaModel;
