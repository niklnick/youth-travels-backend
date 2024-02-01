export class SignupUserDto {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthday?: Date;
}
