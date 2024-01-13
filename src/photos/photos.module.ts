import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PhotoEntity } from './entities/photo/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([PhotoEntity]),
    CloudinaryModule,
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService]
})
export class PhotosModule {}
