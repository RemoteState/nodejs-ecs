import { NextFunction, Request, Response, Router, Application } from 'express';
import { HealthRouter } from './health';

// all your route goes here
const _routes: [string, Router][] = [['/health', HealthRouter]];

// export configured routes
export const routes = (app: Application) => {
    const parentController = Router();
    // every route will go under api/v1
    app.use('/api/v1', parentController);
    _routes.forEach((route) => {
        const [url, controller] = route;
        parentController.use(url, controller);
    });
    // finally add route to catch errors
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(500).send({ status: 'error', error: err });
    });
};
