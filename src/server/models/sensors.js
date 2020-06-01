import mongoose from "mongoose";

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

const sensorModel = mongoose.model("Sensors", sensorSchema);
export default sensorModel;
