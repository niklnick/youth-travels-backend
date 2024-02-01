import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) { }

    async signUp(signupUserDto: SignupUserDto): Promise<AuthUserDto> {
        if (await this.usersRepository.findOne({
            where: { email: signupUserDto.email }
        })) throw new ConflictException();

        const user: User = this.usersRepository.create({
            ...signupUserDto,
            password: await hash(signupUserDto.password, await genSalt())
        });

        return await this.generateAuthUserDto(await this.usersRepository.save(user));
    }

    async logIn(loginUserDto: LoginUserDto): Promise<AuthUserDto> {
        const user: User | null = await this.usersRepository.findOne({
            where: { email: loginUserDto.email }
        });

        if (!user) throw new NotFoundException();
        if (!await compare(loginUserDto.password, user.password)) throw new UnauthorizedException();

        return await this.generateAuthUserDto(user);
    }

    private async generateAuthUserDto(user: User): Promise<AuthUserDto> {
        return {
            user: new ReadUserDto(user),
            accessToken: await this.jwtService.signAsync(
                { sub: user.id },
                { expiresIn: '2m' }
            ),
            refreshToken: await this.jwtService.signAsync(
                { sub: user.id },
                { expiresIn: '7d' }
            )
        };
    }
}
