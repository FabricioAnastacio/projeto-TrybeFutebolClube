import { Secret, SignOptions, sign, verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string | number,
  email: string,
};

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'batatinhaFrita';
  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static createToken(payload: TokenPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  static getPayload(token: string): TokenPayload | string {
    try {
      return verify(token, JWT.secret) as TokenPayload;
    } catch (e) {
      return 'Token must be a valid Token';
    }
  }
}
