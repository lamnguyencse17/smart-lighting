import mqtt from "mqtt";

let client;

export const setClient = (host) => {
  client = mqtt.connect("mqtt://23.97.56.49");
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

export const publishTo = (topic, data) => {
  data = JSON.stringify(data);
  client.publish(topic, data);
};
