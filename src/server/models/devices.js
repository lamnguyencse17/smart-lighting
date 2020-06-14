import mongoose from "mongoose";

const Devices = mongoose.Schema;

export const deviceSchema = new Devices({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
      isOn: { type: Boolean, required: true },
    },
  ],
});

deviceSchema.statics.readDeviceById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

deviceSchema.statics.updateToDeviceId = function (device_id, value, isOn) {
  let result = this.findOneAndUpdate(
    { device_id },
    {
      $push: {
        history: {
          date: Date.now(),
          value: value,
          isOn: isOn,
        },
      },
    },
    { new: true }
  );
  return result;
};

deviceSchema.statics.createDevice = async function (deviceDetails) {
  let { name, device_id } = deviceDetails;
  let result = await this.create({ name, device_id });
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
