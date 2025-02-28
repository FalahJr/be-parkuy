import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { User } from '../../../../entities/user.entity';
export declare class AdminRepository extends Repository<Admin> {
    createAdmin(user: User): Promise<Admin>;
}
