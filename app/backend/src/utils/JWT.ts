import { Secret, SignOptions, sign, verify } from 'jsonwebtoken';

export type TokenPayload = {
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

  static getPayload(bearerToken: string): TokenPayload | string {
    try {
      const token = bearerToken.split(' ')[1];
      return verify(token, JWT.secret) as TokenPayload;
    } catch (e) {
      return 'Token must be a valid token';
    }
  }
}
