import { app } from './server';
import { Database } from './database';
import { Server } from 'http';

const port = process.env.PORT || 3000;
let server: Server | null = null;
const database = Database.getInstance();

// handle graceful shutdown
const gracefulShutdown = async (event: string) => {
    console.log(`${event} signal received: closing HTTP server`);
    if (server) {
        server.close((err) => console.error(err));
    }
    await database.close();
    process.exit();
};
['SIGINT', 'SIGTERM', 'exit', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'].forEach((event) => {
    process.on(event, async () => {
        await gracefulShutdown(event);
    });
});

// connect to database
database
    .connectAndMigrate(true)
    .then(() => {
        // finally start
        server = app.listen(port, () => console.log(`Server is listening on port ${port}!`));
    })
    .catch((err) => console.error(err));
