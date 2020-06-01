import mongoose from "mongoose";

const Areas = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const areaSchema = new Areas({
  name: { type: String, required: true },
  sensors: [{ type: ObjectId, ref: "Sensors" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
});

areaSchema.statics.readAreaById = async function (id) {
  //TODO
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  //remove the useless __v
  // delete result.__v;
};

areaSchema.statics.createArea = async function (areaDetails) {
  let { name, sensors, devices } = areaDetails;
  //TODO
  //implement only what is destructured
  //convert elements of sensors and devices to objectId by using this mongoose.Types.ObjectId(element)
};

areaSchema.statics.deleteArea = async function (id) {
  //TODO
  //Collateral damage: delete in others will be implemented here later
};

const areaModel = mongoose.model("Areas", areaSchema);
export default areaModel;
