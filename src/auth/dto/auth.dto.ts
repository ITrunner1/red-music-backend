import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string

    @MinLength(6, {
        message: "Password should be at least 6 characters long"
    })
    @IsString()
    password: string

    isAdmin: boolean
}

export class RegisterDto {
    @IsEmail()
    email: string

    @MinLength(6, {
        message: "Password should be at least 6 characters long"
    })
    @IsString()
    password: string

    @IsString()
    name: string

    isAdmin: boolean
}