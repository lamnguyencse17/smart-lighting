import mqtt from "mqtt";

let client;

export const setClient = (host) => {
  client = mqtt.connect("mqtt://23.97.56.49"); // update later
  // client = mqtt.connect("mqtt://13.76.250.158:1883", {
  //   username: "BKvm2",
  //   password: "Hcmut_CSE_2020",
  // });
  client.on("connect", () => {
    console.log("Connected to MQTT Broker");
  });
  return client;
};

export const subscribeTo = (topic) => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const publishTo = (data) => {
  data.device_id = "LightD";
  data = JSON.stringify(data);
  client.publish("Topic/LightD", data);
};
