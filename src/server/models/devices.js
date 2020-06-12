import mongoose from "mongoose";

const Devices = mongoose.Schema;

export const deviceSchema = new Devices({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      value: { type: Number, required: true },
      // TODO: fix to isOn - bool and value - number
    },
  ],
});

deviceSchema.statics.readDeviceById = async function (id) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
  delete result.__v;
  return result;
};

deviceSchema.statics.updateToDeviceId = function (device_id, value) {
  let result = this.findOneAndUpdate(
    { device_id },
    { $push: { history: { date: Date.now(), value } } },
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

deviceSchema.statics.updateDevice = async function (deviceDetails) {
  let { device_id, value } = deviceDetails; // destructured it out here too
  let result = this.findOneAndUpdate(
    { device_id },
    {
      $push: {
        history: {
          // TODO: and update here to
          date: Date.now(),
          value: value,
        },
      },
    },
    { new: true }
  )
    .exec()
    .then((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        return doc;
      }
    });
  console.log(result);
};

deviceSchema.statics.deleteDevice = async function (id) {
  let result = await this.findByIdAndDelete(id);
  delete result.__v;
  return result;
};

const deviceModel = mongoose.model("Devices", deviceSchema);
export default deviceModel;
