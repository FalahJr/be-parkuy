import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/main/users/users.service';
import EmailService from '../email/email.service';
export declare class EmailConfirmationService {
    private readonly jwtService;
    private readonly emailService;
    private readonly usersService;
    constructor(jwtService: JwtService, emailService: EmailService, usersService: UsersService);
    sendVerificationLink(email: string): Promise<any>;
    resendConfirmationLink(id: string): Promise<void>;
    confirmEmail(email: string): Promise<{
        status: number;
        message: string;
    }>;
    decodeConfirmationToken(token: string): Promise<any>;
}
