import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment/comment.entity';
import { AccountEntity } from 'src/accounts/entities/account/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from 'src/recipes/entities/recipe/recipe.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { JwtStrategy } from 'src/accounts/jwt.strategy';
import { ChefEntity } from 'src/chefs/entities/chef/chef.entity';
import { PhotoEntity } from 'src/photos/entities/photo/photo.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient/ingredient.entity';
import { RecipeIngredientEntity } from 'src/ingredients/entities/recipe_ingredient/recipe_ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, ChefEntity, RecipeIngredientEntity, IngredientEntity, PhotoEntity, CommentEntity, RecipeEntity,]),
  ],
  controllers: [CommentsController],
  providers: [JwtStrategy,  AccountsService, RecipesService, CommentsService],
  exports: [CommentsService]
})
export class CommentsModule { }
