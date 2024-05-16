import { Auth } from "src/decorators/auth.decorator";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";


@Controller('file') 
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder?: string
    ) {
        return this.fileService.saveFiles(file, folder)
    }
}