import Server from "./server";
import Router from "./router";
import HealthHandler from "./handler/health";

const port = process.env.PORT || 3000

// create server
const server = Server.getInstance();
// listen on port
server.setPort(port);

// create router and routes
const router = Router.getInstance();
// use routes
server.useRoutes(router.Routes());

// start adding routes
router.addRoute('/health', HealthHandler.getInstance().Routes());

// handle graceful shutdown
const gracefulShutdown = (event: string) => {
    console.log(`${event} signal received: closing HTTP server`);
    server.close((err => console.error));
    process.exit();
}
['SIGINT', 'SIGTERM', 'exit', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'].forEach((event) => {
    process.on(event, () => {gracefulShutdown(event)})
})

// finally start
server.start(() => {
    console.log(`server started listing on port: ${port}`);
});

