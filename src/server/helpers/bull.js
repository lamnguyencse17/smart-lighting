import { Queue, QueueScheduler } from "bullmq";
import IORedis from "ioredis";
import conditionModel from "../models/conditions";

let connection;

export const startBullMQ = (
  port = 10777,
  host = "redis-10777.c51.ap-southeast-2-1.ec2.cloud.redislabs.com",
  password = "team2447"
) => {
  connection = new IORedis({
    port,
    host,
    password,
  });
};

export const setJob = (id) => {
  //TODO
};

export const cancelJob = (id) => {
  //TODO
};
