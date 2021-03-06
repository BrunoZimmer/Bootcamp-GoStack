import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  //Validação da toekn JWT
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT toke is missing', 401);
  }

  //Bearer token(Euheahaiuhieuah)

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
