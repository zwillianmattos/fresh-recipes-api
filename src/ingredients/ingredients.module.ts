import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { IngredientEntity } from './entities/ingredient/ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredientEntity } from './entities/recipe_ingredient/recipe_ingredient.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([IngredientEntity, RecipeIngredientEntity]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService]
})
export class IngredientsModule {}
