import { User } from "../entities/user.entity";

export class ReadUserDto {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthday?: Date;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthday = user.birthday;
    }
}
