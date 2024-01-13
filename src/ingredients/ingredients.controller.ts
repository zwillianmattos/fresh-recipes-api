import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}
  
  @Get(':id')
  async getIngredientById(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.getIngredientById(id);
  }

  @Get()
  async getAllIngredients(@Query('search') search?: string) {
    return this.ingredientsService.getAllIngredients(search);
  }
}
