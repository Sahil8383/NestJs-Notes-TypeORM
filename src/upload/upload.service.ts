import { Injectable,NotFoundException  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'typeorm/platform/PlatformTools';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow<string>('AWS_REGION'),
        credentials: {
            accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
        }
    })

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        private readonly entityManager: EntityManager,
    ) {}

    async upload(fileName: string, file: Buffer){
        const uploadedFile = await this.s3Client.send(new PutObjectCommand({
            Bucket: this.configService.getOrThrow<string>('AWS_BUCKET_NAME'),
            Key: fileName,
            Body: file,
        }))
        const cloudFrontUrl = await this.configService.getOrThrow<string>('CLOUD_FRONT');
        return await this.entityManager.transaction(async (transactionalEntityManager) => {
            const file = await transactionalEntityManager.save(new File({
                name: fileName,
                url: `${cloudFrontUrl}/${fileName}`,
            }));
            return file;
        })
    }

    async getFile(key:string){
        const file = await this.fileRepository.findOne({
            where: {
                name: key,
            }
        });
        if(!file){
            throw new NotFoundException();
        }
        return file;
    }

    async getAllFiles(){
        const files = await this.fileRepository.find();
        return files;
    }
}