import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/pagination/pagination.dto";

export class GetAllSongs extends PaginationDto {
    @IsOptional()
    @IsString()
    searchTerm?: string
}