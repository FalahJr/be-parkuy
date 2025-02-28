import { Repository } from 'typeorm';
import { Otp } from 'src/entities/otp.entity';
import CreateOtpDto from '../dto/create-otp.dto';
export declare class OtpRepository extends Repository<Otp> {
    createOtp(createOtpDto: CreateOtpDto): Promise<Otp>;
}
