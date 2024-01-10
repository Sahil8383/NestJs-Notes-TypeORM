import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { dataSourceOption } from './db/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService], 
    //   useFactory: async (configService: ConfigService) => ({
    //     type: configService.get<string>('DB_TYPE') as any,
    //     url: configService.get<string>('DATABASE_URL'),
    //     synchronize: true,
    //     autoLoadEntities: true,
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   }),
    // }),
    TypeOrmModule.forRoot(dataSourceOption),
    NotesModule,

    AuthModule,

    UsersModule,

    UploadModule,
  ],
  providers: [],
})
export class AppModule {}
