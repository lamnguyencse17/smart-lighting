import mongoose from "mongoose";

const Devices = mongoose.Schema;

export const deviceSchema = new Devices({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
});

deviceSchema.statics.readDeviceById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

deviceSchema.statics.createDevice = async function (deviceDetails) {
  let { name, device_id } = deviceDetails;
  //TODO
  let result = await this.create({ name, device_id });
  result = result.toObject();
  delete result.__v;
  return result;
};

deviceSchema.statics.updateDevice = async function (deviceDetails) {
  let { device_id, value } = deviceDetails;
  let result = await this.findOneAndUpdate(
    { device_id },
    {
      $push: {
        readings: {
          date: Date.now(),
          value: value,
        },
      },
    },
    {
      new: true,
    }
  );
  result = result.toObject();
  delete result.__v;
  return result;
};

deviceSchema.statics.deleteDevice = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const deviceModel = mongoose.model("Devices", deviceSchema);
export default deviceModel;
