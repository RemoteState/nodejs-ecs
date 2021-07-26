import { Router } from 'express';
import Users from '../controller/usersController';
import { validate } from 'express-validation';
import { NewUserValidator, SampleArrayRequestValidator } from '../types/user';
export const UserRouter: Router = Router();
const users = Users.getInstance();

UserRouter.post('/all', validate(SampleArrayRequestValidator), users.SayHelloEveryOne);
UserRouter.get('/', users.GetAll);
UserRouter.post('/', validate(NewUserValidator), users.CreateUser);
