import { Queue, QueueScheduler } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  port: 10777,
  host: "redis-10777.c51.ap-southeast-2-1.ec2.cloud.redislabs.com:10777",
  password: "team2447",
});
