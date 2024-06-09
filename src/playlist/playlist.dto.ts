import { IsBoolean, IsNumber, IsString } from "class-validator"

export class PlaylistDto {
    @IsString()
    name: string
    
    @IsString()
    description: string

    @IsString()
    picturePath: string

    @IsBoolean()
    isPublic: boolean
}