import { RecipeEntity } from "src/recipes/entities/recipe/recipe.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photos')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  url: string;
  @Column({ nullable: true })
  alt?: string;
  @ManyToMany(() => RecipeEntity, (recipe) => recipe.photos)
  recipes: RecipeEntity[];
}