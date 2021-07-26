import { Joi } from 'express-validation';
import { Gender } from '../database/entity/users';

export interface SampleArrayRequestBody {
    name: string;
}

export const SampleArrayRequestValidator = {
    body: Joi.array()
        .required()
        .min(1)
        .items(
            Joi.object({
                name: Joi.string().required(),
            }).required()
        ),
};

export const NewUserValidator = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(),
        password: Joi.string().required().min(6),
        gender: Joi.string().required().valid(Gender.Male, Gender.Female, Gender.Other),
    }).required(),
};
