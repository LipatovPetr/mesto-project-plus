import express from 'express';
import {
  createCard,
  getAllCards,
  deleteCard,
  addLike,
  removeLike,
} from '../controllers/cards';

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router
  .route('/')
  .get(getAllCards)
  .post(
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().uri().required(),
      }),
    }),
    createCard,
  );

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  deleteCard,
);

router
  .route('/:id/likes')
  .put(
    celebrate({
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    addLike,
  )
  .delete(
    celebrate({
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    removeLike,
  );

export default router;
