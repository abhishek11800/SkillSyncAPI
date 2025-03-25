import { BaseWorker } from "./base.worker";
import { criticalQueue } from "../config/queue.config";
import { Job } from "bullmq";
import sendEmail from "../services/email/mailer.service";
import { MAIL_SUBJECT } from "../common/constants/mail-subject.constant";
import { EmailPayload } from "../common/types/email-payload.type";
import { MAIL_TEMPLATE } from "../common/constants/template.constant";
import EmailReplacements from "../common/interfaces/email-replacements.interface";

class ResetPasswordMailWorker extends BaseWorker {
    protected override jobName: string = "ResetPasswordMailWorker";
    constructor() {
        super(criticalQueue);
    }

    async processJob(job: Job): Promise<void> {
        const resetToken = job.data.resetToken;
        const resetLink = `${process.env.FRONTEND_URL}/password/reset?token=${resetToken}`;
        const emailPayload: EmailPayload = {
            to: job.data.user,
            subject: MAIL_SUBJECT.RESET_PASSWORD,
            htmlTemplate: MAIL_TEMPLATE.RESET_PASSWORD,
        };
        const replacements: EmailReplacements = { resetLink }
        await sendEmail(emailPayload, replacements);   
    }
}

// Create an instance of ResetPasswordMailWorker
const resetPasswordMailWorker = new ResetPasswordMailWorker();
resetPasswordMailWorker.process((job) => resetPasswordMailWorker.processJob(job));

export default resetPasswordMailWorker;
 