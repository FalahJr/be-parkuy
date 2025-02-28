import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const InjectPetugas = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  request.body.petugas = { id_petugas: request.petugas.id_petugas }
  return request.body;
});