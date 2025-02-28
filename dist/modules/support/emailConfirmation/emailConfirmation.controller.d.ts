import { EmailConfirmationService } from './emailConfirmation.service';
import RequestWithUser from 'src/modules/main/auth/interface/requestWithUser.interface';
import ConfirmEmailDto from '../../../../dist/modules/support/emailConfirmation/confirm-email.dto';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    confirm(confirmationData: ConfirmEmailDto): Promise<void>;
    resendConfirmationLink(request: RequestWithUser): Promise<void>;
}
