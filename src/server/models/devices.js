import mongoose from "mongoose";

const Devices = mongoose.Schema;

export const deviceSchema = new Devices({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      on: { type: Boolean, required: true },
    },
  ],
});

const deviceModel = mongoose.model("Devices", deviceSchema);
export default deviceModel;
