import { Job, Queue } from "bullmq";
import { Worker } from "bullmq";
import { PRIORITY } from "../common/constants/queue.constant";
import { connection } from "../config/queue.config";

export class BaseWorker {
    private queue: Queue;
    protected jobName: string = "BackgroundJob";

    constructor(queue: Queue) {
        this.queue = queue;
    }

    get queuePriority(): number {
        switch (this.queue.name) {
            case "critical":
                return PRIORITY.CRITICAL;
            case "high":
                return PRIORITY.HIGH;
            case "low":
                return PRIORITY.LOW;
            default:
                return PRIORITY.DEFAULT;
        }
    }

    /**
     * Enqueues a job to be processed later.
     * @param payload Job Payload
     */
    async performLater<T>(payload: T): Promise<Job> {
        const priority = this.queuePriority;
        return await this.queue.add(this.jobName, payload, { priority });
    }

    /**
     * Enqueues a job to be processed later.
     * @param payload Job Payload
     * @param delay Delay in milliseconds
     */
    async performIn<T>(delay: number, payload: T): Promise<Job> {
        const priority = this.queuePriority;
        return await this.queue.add(this.jobName, payload, { delay, priority });
    }

    /**
     * Enqueues a job at specified timestamp.
     * @param payload Job Payload
     * @param timestamp Timestamp in milliseconds
     */
    async performAt<T>(timestamp: number, payload: T): Promise<Job> {
        const priority = this.queuePriority;
        return await this.queue.add(this.jobName, payload, { timestamp, priority });
    }

    /**
     * Enqueues a job to be processed immeadiately.
     * @param payload Job Payload
     */
    async performNow<T>(payload: T): Promise<Job> {
        const priority = this.queuePriority;
        return await this.queue.add(this.jobName, payload, { priority });
    }

    async scheduleRecurring(cron: string): Promise<Job> {
        const priority = this.queuePriority;
        return await this.queue.upsertJobScheduler(`recurring-${this.jobName}`, { pattern: cron }, {
            name: this.jobName,
            opts: {
                backoff: 3,
                attempts: 5,
                removeOnFail: 1000,
                priority
              }
        });
    }

    /**
     * Defines how a job should be processed.
     * @param processFunction The function that processes the job.
     */
    process(processFunction: (job: Job) => Promise<void>): void {
        new Worker(this.queue.name, async (job) => {
            try {
                console.log(`Processing job: ${job.name}`);
                await processFunction(job);
                console.log(`Job ${job.id} completed successfully`);
            } catch (error) {
                console.error(`Job ${job.id} failed:`, error);
                throw error;
            }
        }, { connection, concurrency: 10, limiter: { max: 5, duration: 1000 } });
    }
}
