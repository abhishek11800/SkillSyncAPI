import { Queue } from "bullmq";
import { QUEUE } from "../common/constants/queue.constant";

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
const connection = { host: REDIS_HOST, port: REDIS_PORT };
const criticalQueue = new Queue(QUEUE.CRITICAL, { connection });
const highQueue = new Queue(QUEUE.HIGH, { connection });
const defaultQueue = new Queue(QUEUE.DEFAULT, { connection });
const lowQueue = new Queue(QUEUE.LOW, { connection });

export { criticalQueue, highQueue, defaultQueue, lowQueue, connection };