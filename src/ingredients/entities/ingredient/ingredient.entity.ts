import { RecipeEntity } from "src/recipes/entities/recipe/recipe.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeIngredientEntity } from "../recipe_ingredient/recipe_ingredient.entity";
@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ nullable: true })
  iconUrl: string;
  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredientEntity[];
}