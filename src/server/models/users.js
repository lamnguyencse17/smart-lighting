import mongoose from "mongoose";

const Users = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const userSchema = new Users({
  name: { type: String, required: true },
  email: { type: String, required: true },
  areas: [{ type: ObjectId, ref: "Areas" }],
  devices: [{ type: ObjectId, ref: "Devices" }],
  sensors: [{ type: ObjectId, ref: "Sensors" }],
  schedules: [{ type: ObjectId, ref: "Schedules" }],
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
