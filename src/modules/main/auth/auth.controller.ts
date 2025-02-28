import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { UsersService } from '../users/users.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtGuard } from 'src/utils/jwt.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordProfileDto } from './dto/reset-password-profile.dto';
import { UUIDValidationPipe } from '../../support/pipes/uuid-validation.pipe';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('login-pengendara')
  async loginPengendara(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginPengendara(loginUserDto);
  }

  @Post('login-petugas')
  async loginPetugas(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginPetugas(loginUserDto);
  }

  @Post('login-admin')
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('refresh-token-user')
  async refreshTokenUser(
    @Body() refreshTokenUserDto: RefreshAccessTokenDto
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenUserDto);
  }

  @Post('refresh-token-admin')
  async refreshTokenAdmin(
    @Body() refreshTokenUserDto: RefreshAccessTokenDto
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenUserDto);
  }

  @Patch('/:id/revoke-user')
  @UseGuards(JwtGuard)
  async revokeRefreshTokenUser(@Param('id') id: string): Promise<void> {
    return this.authService.revokeRefreshToken(id);
  }

  @Patch('/:id/revoke-admin')
  @UseGuards(JwtGuard)
  async revokeRefreshTokenAdmin(@Param('id') id: string): Promise<void> {
    return this.authService.revokeRefreshToken(id);
  }

  @Post('forget-password')
  async sendEmailForgetPassword(@Body() body: ForgetPasswordDto) {
    const sendLink = await this.usersService.sendForgetPasswordLink(body.email);
    return {
      statusCode: 201,
      message: 'Check your email for next step'
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const email = await this.usersService.decodeConfirmationToken(body.token);
    return await this.usersService.resetPassword(email, body);
  }

  @Post('reset-password-profile')
  @UseGuards(JwtGuard)
  async resetPasswordProfile(
    @Body('email') email: string,
    @Body() body: ResetPasswordProfileDto
  ) {
    return await this.usersService.resetPasswordProfile(email, body);
  }
}
