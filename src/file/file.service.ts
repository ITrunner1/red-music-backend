import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { FileResponse } from './file.interface';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
    async saveFiles(
        mediaFile: Express.Multer.File,
        folder = 'default'
    ): Promise<FileResponse> {
        const uploadFolder = `${path}/uploads/${folder}`
        await ensureDir(uploadFolder)

        await writeFile(
            `${uploadFolder}/${mediaFile.originalname}`,
            mediaFile.buffer
        )

        return {
            url: `/uploads/${folder}/${mediaFile.originalname}`,
            name: mediaFile.originalname
        }
    }
}
