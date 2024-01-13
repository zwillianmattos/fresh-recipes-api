import { Request, Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post(':recipeId')
  async createComment(
    @Request() req,
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body('message') message: string,
  ) {
    const accountId = req.user.sub;
    return this.commentsService.createComment(accountId, recipeId, message);
  }
  @Get(':recipeId')
  async getCommentsByRecipe(@Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.commentsService.getCommentsByRecipe(recipeId);
  }
}
