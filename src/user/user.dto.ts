import { IsOptional, IsEmail, IsString } from "class-validator";

export class UserDto {    
    @IsEmail()
    email: string

    password?: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    avatarPath: string
}