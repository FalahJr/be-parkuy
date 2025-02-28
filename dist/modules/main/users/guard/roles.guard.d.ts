import { CanActivate, Type } from '@nestjs/common';
import Role from 'src/entities/roles-enum';
declare const RoleGuard: (role: Role) => Type<CanActivate>;
export default RoleGuard;
