import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientEntity } from './entities/ingredient/ingredient.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
  ) {}

  async getIngredientById(id: number): Promise<IngredientEntity> {
    const ingredient = await this.ingredientRepository.findOne({ where: { id } });
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }

  async getAllIngredients(search?: string): Promise<IngredientEntity[]> {
    if (search) {
      return this.ingredientRepository.find({
        where: [
          { name: Like(`%${search}%`) },
        ],
      });
    } else {
      return this.ingredientRepository.find();
    }
  }
}
