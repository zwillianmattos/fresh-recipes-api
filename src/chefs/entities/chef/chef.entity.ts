import { AccountEntity } from "src/accounts/entities/account/account.entity";
import { RecipeEntity } from "src/recipes/entities/recipe/recipe.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChefEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  cpf: string;
  @Column({ nullable: false })
  rg: string;
  @OneToOne(() => AccountEntity, (account) => account.chef, { eager: true})
  @JoinColumn()
  account: AccountEntity;
  @OneToMany(() => RecipeEntity, (recipe) => recipe.chef)
  recipes: RecipeEntity[];
}