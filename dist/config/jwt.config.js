"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenConfig = exports.jwtConfig = void 0;
exports.jwtConfig = {
    secret: 'parkuysecretcode',
    signOptions: {
        expiresIn: 300,
    },
};
exports.refreshTokenConfig = {
    expiresIn: 3600 * 24,
};
//# sourceMappingURL=jwt.config.js.map