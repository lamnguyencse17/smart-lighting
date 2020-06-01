import mongoose from "mongoose";

const Areas = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const areaSchema = new Areas({
  name: { type: String, required: true },
  sensors: [{ type: ObjectId, ref: "Sensors" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
});

const areaModel = mongoose.model("Areas", areaSchema);
export default areaModel;
