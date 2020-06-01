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

userSchema.statics.readUser = async function (
  userDetails = { id: "5ed4b3e198024810593e6961", email: "test" }
) {
  let { id, email } = userDetails;
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

userSchema.statics.createUser = async function (
  userDetails = { name: "test", email: "test" }
) {
  let { name, email } = userDetails;
  let result = await this.create({ name, email });
  result = result.toObject();
  delete result.areas;
  delete result.devices;
  delete result.sensors;
  delete result.schedules;
  delete result.__v;
  return result;
};

const userModel = mongoose.model("Users", userSchema);
export default userModel;
