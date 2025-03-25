// This script will remove all jobs from the queues
require("dotenv").config();
const Queue = require("bullmq").Queue;
const QUEUE = { CRITICAL: "critical", LOW: "low", HIGH: "high", DEFAULT: "default",};
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
const connection = { host: REDIS_HOST, port: REDIS_PORT };
const criticalQueue = new Queue(QUEUE.CRITICAL, { connection });
const highQueue = new Queue(QUEUE.HIGH, { connection });
const defaultQueue = new Queue(QUEUE.DEFAULT, { connection });
const lowQueue = new Queue(QUEUE.LOW, { connection });

(async () => {
    await criticalQueue.obliterate({ force: true });
    await highQueue.obliterate({ force: true });
    await defaultQueue.obliterate({ force: true });
    await lowQueue.obliterate({ force: true });
    console.log("All jobs removed from the queues");
    process.exit(0);
})();
