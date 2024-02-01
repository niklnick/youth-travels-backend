import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async signUp(signupUserDto: SignupUserDto): Promise<User> {
        if (await this.usersRepository.findOne({
            where: { email: signupUserDto.email }
        })) throw new ConflictException();

        const user: User = this.usersRepository.create({
            ...signupUserDto,
            password: await hash(signupUserDto.password, await genSalt())
        });

        return await this.usersRepository.save(user);
    }

    async logIn(loginUserDto: LoginUserDto): Promise<User> {
        const user: User | null = await this.usersRepository.findOne({
            where: { email: loginUserDto.email }
        });

        if (!user) throw new NotFoundException();
        if (!await compare(loginUserDto.password, user.password)) throw new UnauthorizedException();

        return user;
    }
}
