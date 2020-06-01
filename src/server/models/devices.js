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

deviceSchema.statics.readDeviceById = async function (id) {
  //TODO
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  //remove the useless __v
  // delete result.__v;
};

deviceSchema.statics.createDevice = async function (deviceDetails) {
  let { name, device_id } = deviceDetails;
  //TODO
};

deviceSchema.statics.deleteDevice = async function (id) {
  //TODO
  //Collateral damage: delete in others will be implemented here later
};

const deviceModel = mongoose.model("Devices", deviceSchema);
export default deviceModel;
