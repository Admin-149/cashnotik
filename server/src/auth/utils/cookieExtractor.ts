import { Request } from 'express';

export const refreshTokenExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['refresh_token'];
  }
  return token;
};
