import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { PhotoEntity } from './entities/photo/photo.entity';
import { FileInterceptor } from '@nestjs/platform-express';


@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadPhoto(file: Express.Multer.File, folderid: string): Promise<PhotoEntity> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file');
    }
    const cloudinaryResponse = await this.cloudinaryService.upload(file.buffer, folderid);
    const photo = new PhotoEntity();
    photo.url = cloudinaryResponse.secure_url;
    photo.alt = file.originalname;
    return this.photoRepository.save(photo);
  }
}
