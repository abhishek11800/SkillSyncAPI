import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { criticalQueue, defaultQueue, highQueue, lowQueue } from "../config/queue.config";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
    queues: [
        new BullMQAdapter(criticalQueue),
        new BullMQAdapter(highQueue),
        new BullMQAdapter(defaultQueue),
        new BullMQAdapter(lowQueue),
    ],
    serverAdapter,
});

export default serverAdapter.getRouter();
