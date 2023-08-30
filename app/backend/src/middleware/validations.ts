import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validateJWT(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    const validation = JWT.getPayload(authorization);
    if (validation === 'Token must be a valid token') {
      return res.status(401).json({
        message: validation,
      });
    }

    req.body = { ...req.body, payload: validation };

    return next();
  }
}

export default Validations;
