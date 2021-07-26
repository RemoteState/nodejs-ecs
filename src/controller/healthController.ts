import { NextFunction, Request, Response } from 'express';

export default class HealthController {
    private static instance: HealthController;
    private constructor() {}

    public static getInstance(): HealthController {
        if (!HealthController.instance) {
            HealthController.instance = new HealthController();
        }
        return HealthController.instance;
    }

    public async GetHealth(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).send({
                status: 'okay',
            });
        } catch (e) {
            next(e);
        }
    }
}
