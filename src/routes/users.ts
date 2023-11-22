import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.route('/').get(getAllUsers);

router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  updateAvatar,
);

export default router;
