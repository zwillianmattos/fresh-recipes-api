import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe/recipe.entity';
import { RecipesDto, UpdateRecipesDto } from './dto/recipes.dto';
import { ChefEntity } from 'src/chefs/entities/chef/chef.entity';
import { PhotoEntity } from 'src/photos/entities/photo/photo.entity';
import { IngredientEntity } from 'src/ingredients/entities/ingredient/ingredient.entity';
import { RecipeIngredientEntity } from 'src/ingredients/entities/recipe_ingredient/recipe_ingredient.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipesRepository: Repository<RecipeEntity>,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    @InjectRepository(ChefEntity)
    private readonly chefRepository: Repository<ChefEntity>,
    @InjectRepository(RecipeIngredientEntity)
    private readonly recipeIngredientRepository: Repository<RecipeIngredientEntity>,
  ) { }
  async getRecipeById(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipesRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async getAllRecipes(search?: string, page: number = 1, limit: number = 10): Promise<{ status: string; data: RecipeEntity[]; message: string; page?: number; limit?: number; total?: number }> {
    try {
      let query = this.recipesRepository
        .createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.chef', 'chef', 'chef.account = false')
        .leftJoinAndSelect('recipe.photos', 'photos')
        .leftJoinAndSelect('recipe.ingredients', 'ingredients');

      if (search) {
        query = query.where('recipe.title ILIKE :search', { search: `%${search}%` });
      }

      const [recipes, total] = await query.offset((page - 1) * limit).limit(limit).getManyAndCount();

      const pagination = {
        page,
        limit,
        total,
      };

      return {
        status: 'success',
        data: recipes,
        message: 'Recipes retrieved successfully',
        ...pagination,
      };
    } catch (error) {
      return {
        status: 'error',
        data: null,
        message: 'Failed to retrieve recipes',
      };
    }
  }

  async updateRecipe(id: number, accountId: number, recipesDto: UpdateRecipesDto): Promise<any> {
    const recipe = await this.getRecipeById(id);
    if (recipe.chef.account.id !== accountId) {
      throw new ForbiddenException("You don't have permission to update this recipe");
    }
    // Remover ingredientes existentes
    await this.recipeIngredientRepository
      .createQueryBuilder()
      .delete()
      .from(RecipeIngredientEntity)
      .where('recipeId = :recipeId', { recipeId: id })
      .execute();
    const { photos, ...recipeData } = recipesDto;
    Object.assign(recipe, recipeData);
    const updatedRecipe = await this.recipesRepository.save(recipe);
    if (photos) {
      const photoEntities = await this.photoRepository.findBy({ id: In(photos || []) });
      updatedRecipe.photos = photoEntities;
      await this.recipesRepository
        .createQueryBuilder()
        .relation(RecipeEntity, 'photos')
        .of(updatedRecipe)
        .add(photoEntities);
    }
    return updatedRecipe;
  }

  async createRecipe(accountId: number, recipesDto: RecipesDto): Promise<RecipeEntity> {
    try {
      const { ingredients, photos, ...recipeData } = recipesDto;
      const chef = await this.chefRepository.findOne({ where: { account: { id: accountId } } });
      const photoEntities = await this.photoRepository.findBy({ id: In(photos || []) });
      const newRecipe = await this.recipesRepository.create({
        ...recipeData,
        chef,
        photos: photoEntities,
      });
      const savedRecipe = await this.recipesRepository.save(newRecipe);
      const ingredientsToAdd = await Promise.all(recipesDto.ingredients.map(async (ingredientInfo) => {
        const { ingredient, quantity, unit } = ingredientInfo;
        const ingredientData = await this.ingredientRepository.findOneOrFail({ where: { id: ingredient } });
        const recipeIngredient = new RecipeIngredientEntity();
        recipeIngredient.recipe = savedRecipe;
        recipeIngredient.ingredient = ingredientData;
        recipeIngredient.quantity = quantity;
        recipeIngredient.unit = unit;
        return recipeIngredient;
      }));
      await this.recipeIngredientRepository.save(ingredientsToAdd);
      return savedRecipe;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async deleteRecipe(id: number, accountId: number): Promise<Object> {
    const recipe = await this.getRecipeById(id);
    if (recipe.chef.account.id !== accountId) {
      throw new ForbiddenException("You don't have permission to delete this recipe");
    }
    // Remover ingredientes existentes
    await this.recipeIngredientRepository
      .createQueryBuilder()
      .delete()
      .from(RecipeIngredientEntity)
      .where('recipeId = :recipeId', { recipeId: id })
      .execute();
    await this.recipesRepository.delete(id);
    return {
      message: 'Removed successfully'
    }
  }

  async paginate(search: string, options: IPaginationOptions): Promise<Pagination<RecipeEntity>> {
    const queryBuilder = this.recipesRepository.createQueryBuilder('recipes');
    if (search) {
      queryBuilder.where('recipes.title LIKE :search or recipes.description LIKE :search', { search: `%${search}%` });
    }
    queryBuilder.leftJoinAndSelect('recipes.chef', 'chef');
    queryBuilder.leftJoinAndSelect('recipes.photos', 'photos');
    queryBuilder.leftJoinAndSelect('recipes.comments', 'comments');
    queryBuilder.leftJoinAndSelect('comments.account', 'comments_account');
    queryBuilder.leftJoinAndSelect('recipes.ingredients', 'recipe_ingredients');
    queryBuilder.leftJoinAndSelect('recipe_ingredients.ingredient', 'ingredients');
    
    return paginate<RecipeEntity>(queryBuilder, options);
  }
}
