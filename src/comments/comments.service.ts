import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './entities/comment/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from 'src/recipes/entities/recipe/recipe.entity';
import { AccountEntity } from 'src/accounts/entities/account/account.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async createComment(accountId: number, recipeId: number, message: string): Promise<any> {
    const recipe = await this.recipeRepository.findOne( { where: { id: recipeId}, relations: ['comments'] });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const account = await this.accountRepository.findOne({
      where: { id: accountId }
    });
    const comment = new CommentEntity();
    comment.message = message;
    comment.account = account;
    comment.recipe = recipe;
    const response = await this.commentRepository.save(comment);
    return { message: response.message, account: response.account }
  }

  async getCommentsByRecipe(recipeId: number): Promise<CommentEntity[]> {
    const recipe = await this.recipeRepository.findOne( { where: { id: recipeId}, relations: ['comments'] });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe.comments;
  }
}
