import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { RecipeEntity } from "src/recipes/entities/recipe/recipe.entity";

@Entity('recipe_ingredients')
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn({ name: 'recipe_ingredient_id' }) // Defina um nome exclusivo para a chave primária
  id: number;
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredients)
  recipe: RecipeEntity;
  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.recipeIngredients)
  ingredient: IngredientEntity;
  @Column()
  quantity: number;
  @Column()
  unit: string;
}