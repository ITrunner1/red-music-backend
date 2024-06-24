import { IsString } from "class-validator"

export class SongDto {
    @IsString()
    name: string

    isPublic?: boolean

    @IsString()
    audioPath: string

    @IsString()
    thumbnailPath: string
  
    genre?:string

    status?: string      
    
    rejectedReason?: string
}