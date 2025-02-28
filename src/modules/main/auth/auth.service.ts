import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/modules/main/users/users.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { TokenExpiredError } from 'jsonwebtoken';
import { ConflictException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) { }

  async loginPengendara(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    if (user) {
      const checkEmail = await this.usersService.checkVerifiedEmail(user.email);
      if (checkEmail) {
        if (user) {
          const payload = {
            email: user.email,
            sub: user.id
          };

          const access_token = await this.createAccessToken(user);
          const refresh_token = await this.createRefreshToken(user);

          return {
            statusCode: 201,
            message: 'Successfully login as Pengendara',
            data: {
              id_pengendara: user.pengendara.id_pengendara,
              access_token,
              refresh_token,
              emailVerified: user.emailVerified,
              status: user.pengendara.status,
              status_parkir: user.pengendara.status_parkir
            }
          }
        }
      } else {
        const sendVerifiedLink = await this.usersService.sendVerificationLink(user.email, user.id);
        throw new BadRequestException("Please verify your email first, we already send verification link on your email");
      }
    }
  }

  async loginPetugas(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    if (user) {
      const checkEmail = await this.usersService.checkVerifiedEmail(user.email);
      if (checkEmail) {
        if (user) {
          const payload = {
            email: user.email,
            sub: user.id
          };

          const access_token = await this.createAccessToken(user);
          const refresh_token = await this.createRefreshToken(user);

          return {
            statusCode: 201,
            message: 'Successfully login as Petugas',
            data: {
              id_petugas: user.petugas.id_petugas,
              access_token,
              refresh_token,
              emailVerified: user.emailVerified,
              status_petugas: user.petugas.status,
              status_bekerja: user.petugas.status_bekerja
            }
          }
        }
      } else {
        const sendVerifiedLink = await this.usersService.sendVerificationLink(user.email, user.id);
        throw new BadRequestException("Please verify your email first, we already send verification link on your email");
      }
    }
  }

  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;

    const admin = await this.usersService.validateAdmin(username, password);

    if (!admin) {
      throw new UnauthorizedException('Wrong username or password');
    }

    if (admin.role != `Admin`) {
      throw new ConflictException("you don't have access");
    }

    if (admin) {
      const payload = {
        sub: admin.id
      };

      const access_token = await this.createAccessToken(admin);
      const refresh_token = await this.createRefreshToken(admin);

      return {
        statusCode: 201,
        message: 'Successfully login as Admin',
        data: {
          username: admin.username,
          access_token,
          refresh_token,
        }
      }
    } else {
      throw new BadRequestException("Please verify your email first");
    }
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne(
      payload.jwt_id,
      { relations: ['user'] },
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has beed revoked');
    }

    const access_token = await this.createAccessToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id
    };
    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );
    const payload = {
      jwt_id: refreshToken.id_refresh,
    };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );
    return refresh_token;
  }

  async revokeRefreshToken(id: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne(id);
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    refreshToken.isRevoked = true;
    await refreshToken.save();
  }

}
