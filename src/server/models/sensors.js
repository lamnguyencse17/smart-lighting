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

sensorSchema.statics.readSensorById = async function (id) {
  //TODO
  //findOne needs objectId type
  //remember the field is _id not id !!
  //convert id to ObjectId
  //remove the useless __v
  // delete result.__v;
};

sensorSchema.statics.createSensor = async function (sensorDetails) {
  let { name, device_id } = sensorDetails;
  //TODO
  //implement only what is destructured
};

sensorSchema.statics.deleteSensor = async function (id) {
  //TODO
  //Collateral damage: delete in others will be implemented here later
};

const sensorModel = mongoose.model("Sensors", sensorSchema);
export default sensorModel;
