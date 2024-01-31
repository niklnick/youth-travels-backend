import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.save({ ...user, ...updateUserDto });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.remove(user);
    } catch {
      throw new NotFoundException();
    }
  }
}
