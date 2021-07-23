import express, { Application } from 'express';
import { routes } from '../router';

// Boot express
export const app: Application = express();

// Application routing
routes(app);
