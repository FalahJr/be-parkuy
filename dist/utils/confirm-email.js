"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = void 0;
const redis_1 = require("../redis");
const uuid_1 = require("uuid");
const confirmEmail = async (userId) => {
    const id = (0, uuid_1.v4)();
    await redis_1.redis.set(id, userId, 'ex', 60 * 60 * 15);
    return `${process.env.BACKEND_HOST}/user/confirm/${id}`;
};
exports.confirmEmail = confirmEmail;
//# sourceMappingURL=confirm-email.js.map