import {app} from "./server";

const port = process.env.PORT || 3000;

// handle graceful shutdown
const gracefulShutdown = (event: string) => {
    console.log(`${event} signal received: closing HTTP server`);
    server.close((err => console.error(err)));
    process.exit();
}
['SIGINT', 'SIGTERM', 'exit', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'].forEach((event) => {
    process.on(event, () => { gracefulShutdown(event) })
})

// finally start
const server = app.listen(port, () => console.log(`Server is listening on port ${port}!`))

