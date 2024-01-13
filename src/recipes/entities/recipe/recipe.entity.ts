import { AccountEntity } from "src/accounts/entities/account/account.entity";
import { ChefEntity } from "src/chefs/entities/chef/chef.entity";
import { CommentEntity } from "src/comments/entities/comment/comment.entity";
import { IngredientEntity } from "src/ingredients/entities/ingredient/ingredient.entity";
import { RecipeIngredientEntity } from "src/ingredients/entities/recipe_ingredient/recipe_ingredient.entity";
import { PhotoEntity } from "src/photos/entities/photo/photo.entity";
import { AfterInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, getRepository } from "typeorm";

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  time: string;
  @Column()
  difficulty: string;
  @Column()
  calories: string;
  @Column()
  proteins: string;
  @Column()
  carbs: string;
  @Column()
  fats: string;
  @ManyToOne(() => ChefEntity, (chef) => chef.recipes, { eager: true })
  chef: ChefEntity;
  @Column('simple-array')
  steps: string[];
  @ManyToMany(() => PhotoEntity, { eager: true, cascade: true })
  @JoinTable({
    name: 'recipe_photos',
    joinColumn: {
      name: 'recipeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'photoId',
      referencedColumnName: 'id',
    },
  })
  photos: PhotoEntity[];
  @OneToMany(() => CommentEntity, (comment) => comment.recipe, { eager: true })
  comments: CommentEntity[];
  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.recipe, { cascade: true })
  ingredients: RecipeIngredientEntity[];
}
