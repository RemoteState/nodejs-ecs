import { Joi } from 'express-validation';

export interface SampleRequestBody {
    name: string;
    data: {
        age: number;
    };
}

export const SampleRequestValidator = {
    body: Joi.object({
        name: Joi.string().required(),
        data: Joi.object({
            age: Joi.number().required().min(1),
        }).required(),
    }).required(),
};

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
