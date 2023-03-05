import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import log from '../../logger.js';
export const authMiddleware: RequestHandler = (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(' ')[1];
  if (!jwtToken) {
    return res.sendStatus(401);
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET enviroment variable must be defined');
    }

    const payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET,
    ) as jwt.JwtPayload;

    res.locals.email = payload.email;
    next();
  } catch (err) {
    log.error(err);
    res.sendStatus(403);
  }
};
