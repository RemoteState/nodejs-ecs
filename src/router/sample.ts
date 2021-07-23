import { Router } from 'express';
import Sample from '../controller/sample';
import { validate } from 'express-validation';
import { SampleArrayRequestValidator, SampleRequestValidator } from '../types/sample';
export const SampleRouter: Router = Router();
const sample = Sample.getInstance();

SampleRouter.post('/', validate(SampleRequestValidator), sample.SayHello);
SampleRouter.post('/all', validate(SampleArrayRequestValidator), sample.SayHelloEveryOne);
