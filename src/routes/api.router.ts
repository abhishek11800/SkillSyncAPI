import { Router } from 'express';
import courseRouter from './course.router';
import integrationRouter from './integration.route';
import skillRouter from './skill.route';
import adminRouter from './admin.router';
import validateAdmin from '../guards/admin.guard';

const apiRouter = Router();
apiRouter.use('/admin', validateAdmin, adminRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/skills', skillRouter);
apiRouter.use('/integrations', integrationRouter);

export default apiRouter;
