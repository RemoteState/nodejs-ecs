import express from "express";

/**
 * Router singleton class which provides all the routes
 * which should be handled
 */
export default class Router {
    // instance of router class
    private static instance: Router;

    // instance of express routes
    private routes: express.Router;

    // parent route instance
    private parentRoute: express.Router;

    /**
     * Creates the instance of Router class
     * @private ctor
     */
    private constructor() {
        this.setupRouter();
    }

    /**
     * Routes provides all the registered routes
     * @constructor
     */
    public Routes(): express.Router {
        return this.routes;
    }

    /**
     * getInstance provides the instance of Router class
     */
    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance
    }

    /**
     * setupRouter sets up the parent route, under which all other routes will be added
     * @private
     */
    private setupRouter() {
        this.routes = express.Router()
        this.parentRoute = express.Router();
        this.routes.use(`/api/v1`, this.parentRoute);

        // handle error
        this.routes.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(500).send({
                status: 'error',
                error: err
            });
        })
    }

    /**
     * addRoute will take the path and a router instance and add it under the parent route
     * @param path
     * @param route
     */
    public addRoute(path: string, route: express.Router) {
        this.parentRoute.use(path, route);
    }
}
