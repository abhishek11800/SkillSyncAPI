import { BaseWorker } from "./base.worker";
import { lowQueue } from "../config/queue.config";
import { Job } from "bullmq";

class ReminderWorker extends BaseWorker {
    protected override jobName: string = "ReminderWorker";
    constructor() {
        super(lowQueue);
    }

    async processJob(job: Job): Promise<void> {
        console.log(`ReminderWorker is processing job: ${job.id}`);
    }
}

// Create an instance of EmailWorker
const reminderWorker = new ReminderWorker();
reminderWorker.process((job) => reminderWorker.processJob(job));

export default reminderWorker;
 