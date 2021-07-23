import { NextFunction, Request, Response } from 'express';

export default class Health {
    private static instance: Health;

    private constructor() {}

    public static getInstance(): Health {
        if (!Health.instance) {
            Health.instance = new Health();
        }
        return Health.instance;
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
