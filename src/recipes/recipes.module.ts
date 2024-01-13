import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from 'src/ingredients/entities/ingredient/ingredient.entity';
import { RecipeEntity } from './entities/recipe/recipe.entity';
import { AccountEntity } from 'src/accounts/entities/account/account.entity';
import { ChefEntity } from 'src/chefs/entities/chef/chef.entity';
import { CommentEntity } from 'src/comments/entities/comment/comment.entity';
import { JwtService } from '@nestjs/jwt';
import { PhotoEntity } from 'src/photos/entities/photo/photo.entity';
import { RecipeIngredientEntity } from 'src/ingredients/entities/recipe_ingredient/recipe_ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, ChefEntity, RecipeIngredientEntity, IngredientEntity, PhotoEntity, CommentEntity, RecipeEntity,]),
  ],
  controllers: [RecipesController],
  providers: [JwtService, RecipesService],
  exports: [RecipesService]
})
export class RecipesModule { }
