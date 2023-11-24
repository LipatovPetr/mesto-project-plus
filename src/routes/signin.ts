import express from 'express';
import { login } from '../controllers/users';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.get(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(200).required(),
    }),
  }),
  login,
);

export default router;
