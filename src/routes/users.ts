import express from 'express';
import {
  getAllUsers,
  getUser,
  getUserByID,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.route('/').get(getAllUsers);

router
  .route('/me')
  .get(getUser)
  .patch(
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200),
      }),
    }),
    updateUser,
  );

router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  getUserByID,
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
