import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(): Promise<ReadUserDto[]> {
    return (await this.usersService.findAll()).map((user: User) => new ReadUserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return new ReadUserDto(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    return new ReadUserDto(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<ReadUserDto> {
    return new ReadUserDto(await this.usersService.remove(id));
  }
}
