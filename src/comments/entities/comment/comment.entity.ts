import { AccountEntity } from "src/accounts/entities/account/account.entity";
import { RecipeEntity } from "src/recipes/entities/recipe/recipe.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from "typeorm";

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @ManyToOne(() => AccountEntity, (account) => account.comments, { eager: true })
  account: AccountEntity;
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.comments)
  recipe: RecipeEntity;
  @OneToMany(() => CommentEntity, (reply) => reply.parent)
  replies: CommentEntity[];
  @ManyToOne(() => CommentEntity, (parent) => parent.replies)
  parent: CommentEntity;
}