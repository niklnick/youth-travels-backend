import { ReadUserDto } from "src/users/dto/read-user.dto";

export class AuthUserDto {
    readonly user: ReadUserDto;
    readonly accessToken: string;
    readonly refreshToken: string;
}
