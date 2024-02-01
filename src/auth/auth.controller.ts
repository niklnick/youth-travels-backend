import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signupUserDto: SignupUserDto): Promise<ReadUserDto> {
        return new ReadUserDto(await this.authService.signUp(signupUserDto));
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async logIn(@Body() loginUserDto: LoginUserDto): Promise<ReadUserDto> {
        return new ReadUserDto(await this.authService.logIn(loginUserDto));
    }
}
