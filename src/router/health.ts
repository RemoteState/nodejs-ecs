import { Router } from 'express';
import Health from '../controller/health';
export const HealthRouter: Router = Router();
const health = Health.getInstance();

HealthRouter.get('/', health.GetHealth);
