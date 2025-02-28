"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectPetugas = void 0;
const common_1 = require("@nestjs/common");
exports.InjectPetugas = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    request.body.petugas = { id_petugas: request.petugas.id_petugas };
    return request.body;
});
//# sourceMappingURL=inject-user.decorator.js.map