import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: id }
    });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.remove(user);
  }
}
