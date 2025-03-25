import { BaseWorker } from "./base.worker";
import { defaultQueue } from "../config/queue.config";
import { Job } from "bullmq";

class EmailWorker extends BaseWorker {
    protected override jobName: string = "EmailWorker";
    constructor() {
        super(defaultQueue);
    }

    async processJob(job: Job): Promise<void> {
        console.log(`EmailWorker is processing job: ${job.id}`);
    }
}

// Create an instance of EmailWorker
const emailWorker = new EmailWorker();
emailWorker.process((job) => emailWorker.processJob(job));

export default emailWorker;
 