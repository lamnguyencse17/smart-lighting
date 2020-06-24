import mongoose from "mongoose";
import deviceModel, { deviceSchema } from "./devices";

const Conditions = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const conditionSchema = new Conditions({
  comparison: { type: Number, required: true }, // 0: equal 1: greater 2: smaller
  isOn: { type: Boolean, required: true },
  value: { type: Number, required: true },
  sensorValue: { type: Number, required: true },
  area: { type: ObjectId, ref: "Areas" },
  device: { type: ObjectId, ref: "Devices" },
  sensor: { type: ObjectId, ref: "Sensors" },
});

conditionSchema.statics.readConditionById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

conditionSchema.statics.createCondition = async function (conditionDetails) {
  let {
    comparison,
    isOn,
    area,
    device,
    value,
    sensor,
    sensorValue,
  } = conditionDetails;
  let result = await this.create({
    comparison,
    sensorValue,
    isOn,
    value,
    area: area ? area : null,
    device: device ? device : null,
    sensor: sensor ? sensor : null,
  });
  result = result.toObject();
  deviceModel.addCondition(device, result._id);
  delete result.__v;
  return result;
};

conditionSchema.statics.deleteCondition = async function (id) {
  let result = await this.findByIdAndDelete(id);
  //TODO: cascading delete
  delete result.__v;
  return result;
};

const conditionModel = mongoose.model("Conditions", conditionSchema);
export default conditionModel;
