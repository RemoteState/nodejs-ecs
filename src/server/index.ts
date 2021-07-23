import express, {Express} from "express";
import bodyparser from "body-parser";
import cors from "cors";
import * as http from "http";

/**
 * Server singleton class provides the instance of wrapped express app
 * which can be then used to run the API routes
 */
export default class Server {
    // instance of server
    private static instance: Server;

    // port on which the express will listen
    private port: string | number;

    // instance of express
    private app: Express;

    // instance of http server
    private server: http.Server;

    /**
     * Creates the instance of Server
     * @private ctor
     */
    private constructor() {
        // get the express instance ready for our use cases
        // with body parser and cors enabled
        this.app = express()
        this.app.use(bodyparser.json());
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "x-api-key"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        this.app.use(cors(corsOptions))
        this.port = 3000;
    }

    /**
     * getInstance should be used to get the instance of server class
     */
    public static getInstance(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    /**
     * setPort function should be used to set the port on which express will listen
     * by default, if no port is provided, it will listen to port 3000
     * @param port - port number on which the express should listen to
     * @public
     */
    public setPort(port: string | number) {
        this.port = port;
    }

    /**
     * useRoutes function takes router to handle all the server routes
     * @param router
     */
    public useRoutes(router: express.Router) {
        this.app.use(router);
    }

    /**
     * starts listing and serving to requests
     * @param callback
     */
    public start(callback: () => void) {
        this.server = this.app.listen(this.port, callback);
    }

    public close(callback: (err?: Error)=> void) {
        this.server.close(callback)
    }
}
