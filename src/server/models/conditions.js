import mongoose from "mongoose";

const Conditions = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const conditionSchema = new Conditions({
  comparison: { type: Number, required: true },
  on: { type: Boolean, required: true },
  areas: [{ type: ObjectId, ref: "Areas" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
});

conditionSchema.statics.readConditionById = async function (id) {
  //TODO
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  //remove the useless __v
  // delete result.__v;
};

conditionSchema.statics.createCondition = async function (conditionDetails) {
  let { comparison, on, areas, devices } = conditionDetails;
  //TODO
  //implement only what is destructured
  //convert elements of areas and devices to objectId by using this mongoose.Types.ObjectId(element)
};

conditionSchema.statics.deleteCondition = async function (id) {
  //TODO
  //Collateral damage: delete in others will be implemented here later
};

const conditionModel = mongoose.model("Conditions", conditionSchema);
export default conditionModel;
