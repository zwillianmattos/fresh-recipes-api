import { Request, Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe, Put, Delete, Query, DefaultValuePipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';
import { RecipesDto, UpdateRecipesDto } from './dto/recipes.dto';
import { ChefAuthGuard } from 'src/accounts/chef-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get(':id')
  async getRecipeById(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getRecipeById(id);
  }
  @Get()
  async getAllRecipes(
    @Query('search') search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    const recipes = await this.recipesService.paginate(search, {page, limit, route: '/recipes/'});
    return recipes;
  }
  
  @Post()
  @UseGuards(ChefAuthGuard)
  async createRecipe(@Request() req, @Body(ValidationPipe) recipesDto: RecipesDto) {
    const accountId = req.user.id;
    return this.recipesService.createRecipe(accountId, recipesDto);
  }
  @Put(':id')
  @UseGuards(ChefAuthGuard)
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body(ValidationPipe) recipesDto: UpdateRecipesDto,
  ) {
    const accountId = req.user.id;
    return this.recipesService.updateRecipe(id, accountId, recipesDto);
  }
  @Delete(':id')
  @UseGuards(ChefAuthGuard)
  async deleteRecipe(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const accountId = req.user.id;
    return this.recipesService.deleteRecipe(id, accountId);
  }
}
