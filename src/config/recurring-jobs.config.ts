import { CRON_SCHEDULE } from "../common/constants/cron-schedule.constant";
import reminderWorker from "../workers/reminder.worker";

const RECURRING_JOBS = [reminderWorker];

export default function loadRecurringJobs() {
    // Recurring Jobs configuration code here
    RECURRING_JOBS.forEach(async (job) => {
        await job.scheduleRecurring(CRON_SCHEDULE.EVERY_DAY);
    });
}
