import { NextFunction, Request, Response } from 'express';
import { SampleArrayRequestBody, SampleRequestBody } from '../types/sample';

export default class Sample {
    private static instance: Sample;
    private constructor() {}

    public static getInstance(): Sample {
        if (!Sample.instance) {
            Sample.instance = new Sample();
        }
        return Sample.instance;
    }

    public async SayHello(req: Request, res: Response, next: NextFunction) {
        const body = req.body as SampleRequestBody;
        try {
            body.name = 'Hello ' + body.name;
            res.status(200).send({
                status: 'success',
                data: body,
            });
        } catch (e) {
            next(e);
        }
    }

    public async SayHelloEveryOne(req: Request, res: Response, next: NextFunction) {
        const body = req.body as SampleArrayRequestBody[];
        try {
            const updated = body.map((data) => {
                data.name = 'Hello ' + data.name;
                return data;
            });
            res.status(200).send({
                status: 'success',
                data: updated,
            });
        } catch (e) {
            next(e);
        }
    }
}
