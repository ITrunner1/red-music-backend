import { IsNumber, IsString } from "class-validator";

export class CommentDto {
    @IsString()
    text: string

    @IsNumber()
    songId: number

    @IsString()
    status: string

    @IsString()
    rejectedReason: string
}