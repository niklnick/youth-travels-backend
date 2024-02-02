import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signupUserDto: SignupUserDto): Promise<AuthUserDto> {
        return await this.authService.signUp(signupUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async logIn(@Body() loginUserDto: LoginUserDto): Promise<AuthUserDto> {
        return await this.authService.logIn(loginUserDto);
    }

    @Get('refresh')
    async refresh(@Body() { refreshToken }): Promise<AuthUserDto> {
        return await this.authService.refresh(refreshToken);
    }
}
