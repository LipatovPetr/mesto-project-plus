import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

// 1. насколько я понял, лучшая практика обработки ошибок тайпскриптом подразумевает
// что ошибка инициализируется в блоке catch с типом unknow

// 2. далее тип ошибки нужно определить в if блоке, который будет находится
//  в блоке catch контроллера или в функции обработки ошибки (как той, которая находится снизу)

// 3. вы настояли, чтобы я убрал if блок из функции обработки ошибки, тем самым мне пришлось
// добавить if блок в catch блок каждого контроллера, что создало много дублированного кода

// мне не кажется это оптимизацией, может я что-то не понимаю?

const handleErrors = (res: Response, error: Error) => {
  let statusCode: number;
  switch (error.name) {
    case 'ValidationError':
    case 'CastError':
      statusCode = StatusCodes.BAD_REQUEST;
      break;
    case 'DocumentNotFoundError':
      statusCode = StatusCodes.NOT_FOUND;
      break;
    default:
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      break;
  }
  return res.status(statusCode).send({ message: error.message });
};

export default handleErrors;
