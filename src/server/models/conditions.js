import mongoose from "mongoose";

const Conditions = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const conditionSchema = new Conditions({
  comparison: { type: Number, required: true },
  on: { type: Boolean, required: true },
  areas: [{ type: ObjectId, ref: "Areas" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
});

const conditionModel = mongoose.model("Conditions", conditionSchema);
export default conditionModel;
