import express from 'express';
import {
  createCard,
  getAllCards,
  deleteCard,
  addLike,
  removeLike,
} from '../controllers/cards';
import { urlRegex } from '../constants';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router
  .route('/')
  .get(getAllCards)
  .post(
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().regex(urlRegex, 'URL format').required(),
      }),
    }),
    createCard,
  );

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

router
  .route('/:id/likes')
  .put(
    celebrate({
      params: Joi.object().keys({
        id: Joi.string().hex().required(),
      }),
    }),
    addLike,
  )
  .delete(
    celebrate({
      params: Joi.object().keys({
        id: Joi.string().hex().required(),
      }),
    }),
    removeLike,
  );

export default router;
