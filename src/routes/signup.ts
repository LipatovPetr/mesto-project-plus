import express from 'express';
import { createUser } from '../controllers/users';
import { passwordRegex } from '../constants';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .max(200)
        .required()
        .regex(
          passwordRegex,
          'minimum eight characters, at least one letter and one number:',
        ),
    }),
  }),
  createUser,
);

export default router;
