import { Body, Controller, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoEntity } from './entities/photo/photo.entity';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Param('folderId') folderId: string,): Promise<PhotoEntity> {
    return this.photosService.uploadPhoto(file, folderId);
  }
}
