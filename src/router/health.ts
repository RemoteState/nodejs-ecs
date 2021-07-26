import { Router } from 'express';
import HealthController from '../controller/healthController';
export const HealthRouter: Router = Router();
const health = HealthController.getInstance();

HealthRouter.get('/', health.GetHealth);
