import { NextFunction, Request, Response } from 'express';
import { SampleArrayRequestBody } from '../types/user';
import { User } from '../database/entity/users';
import Utils from '../utils';

export default class UsersController {
    private static instance: UsersController;
    private constructor() {}

    public static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

    public async SayHelloEveryOne(req: Request, res: Response, next: NextFunction) {
        const body = req.body as SampleArrayRequestBody[];
        try {
            const updated = body.map((data) => {
                data.name = 'Hello ' + data.name;
                return data;
            });
            res.status(200).send({
                status: 'success',
                data: updated,
            });
        } catch (e) {
            next(e);
        }
    }

    public async GetAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find();
            res.status(200).send({
                users,
                status: 'success',
            });
        } catch (e) {
            next(e);
        }
    }

    public async CreateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userReq = req.body;
            const user = new User();
            user.firstName = userReq.firstName;
            user.lastName = userReq.lastName;
            user.email = userReq.email;
            user.phone = userReq.phone;
            user.password = Utils.HashPassword(userReq.password);
            user.gender = userReq.gender;
            await user.save();
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}
