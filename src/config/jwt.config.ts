import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
  secret: 'parkuysecretcode',
  signOptions: {
    expiresIn: 300,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  expiresIn: 3600 * 24,
};