import mongoose from "mongoose";

const Conditions = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const conditionSchema = new Conditions({
  comparison: { type: Number, required: true },
  isOn: { type: Boolean, required: true },
  area: { type: ObjectId, ref: "Areas" },
  device: { type: ObjectId, ref: "Devices" },
  sensor: { type: ObjectId, ref: "Devices" },
});

conditionSchema.statics.readConditionById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

conditionSchema.statics.createCondition = async function (conditionDetails) {
  let { comparison, isOn, area, device } = conditionDetails;
  let result = await this.create({ comparison, isOn, area, device, sensor });
  result = result.toObject();
  delete result.__v;
  return result;
};

conditionSchema.statics.deleteCondition = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const conditionModel = mongoose.model("Conditions", conditionSchema);
export default conditionModel;
