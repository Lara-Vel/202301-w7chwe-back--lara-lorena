import { RequestHandler } from 'express';
import logger from '../../logger.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { UserModel } from '../user/user-schema.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

const EMAIL_REGEX_VALIDATION = /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  logger.debug(`User ${email} is trying to register`);

  if (!EMAIL_REGEX_VALIDATION.test(email)) {
    logger.debug(
      'Email does not comply with regex validation',
      EMAIL_REGEX_VALIDATION,
    );
    return res.status(400).json({ msg: 'Email must be a valid email' });
  }

  if (!password) {
    return res.status(400).json({ msg: 'Password must be defined' });
  }

  try {
    const existingDbUser = await UserModel.findOne({ email }).exec();
    if (existingDbUser !== null) {
      return res.status(409).json({ msg: 'User is already registered in app' });
    }

    const user = {
      email,
      password: encryptPassword(password),
    };
    await UserModel.create(user);

    res.sendStatus(201);
    logger.info('controller', res.status);
  } catch (err) {
    logger.error('Error registering user', err);
    res.sendStatus(500);
  }
};

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  try {
    const filterUser = {
      email,
      password: encryptPassword(password),
    };

    const existingUser = await UserModel.find(filterUser).exec();

    if (existingUser === null) {
      return res.sendStatus(404);
    }

    const tokenJWT = generateJWTToken(email);
    res.status(201).json({
      accessToken: tokenJWT,
    });
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};
