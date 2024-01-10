import { Controller, Get, Header, Logger, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(
        private readonly uploadService: UploadService,
    ) { }

    private readonly logger = new Logger(UploadController.name);
    
    @Get()
    async getAllFiles(){
        return await this.uploadService.getAllFiles();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.upload(file.originalname, file.buffer);
    }

    @Get(':key')
    async getFile(@Param('key') key: string,){
        return await this.uploadService.getFile(key);
    }
}
