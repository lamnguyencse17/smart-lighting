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

userSchema.statics.readUserById = async function (id) {
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  //remove the useless __v
  delete result.__v;
  return result;
};

userSchema.statics.readUserByEmail = async function (email = "test") {
  let result = await this.findOne({ email }).lean();
  delete result.__v;
  return result;
};

userSchema.statics.createUser = async function (userDetails) {
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

userSchema.statics.deleteUser = async function (id) {
  // findByIdAndDelete does not use objectId !!!!
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
  //Collateral damage: delete in others will be implemented here later
};

const userModel = mongoose.model("Users", userSchema);
export default userModel;
