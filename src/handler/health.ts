import express from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";

/**
 * HealthHandler provides the instance of a basic handler
 */
export default class HealthHandler {
    private static instance: HealthHandler;
    private constructor() {}

    public static getInstance(): HealthHandler {
        if (!HealthHandler.instance) {
            HealthHandler.instance = new HealthHandler();
        }
        return HealthHandler.instance;
    }

    public Routes(): express.Router {
        const routes = express.Router();
        routes.get('/', this.get);
        return routes;
    }


    private async get(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            health: 'okay'
        });
    }
}
