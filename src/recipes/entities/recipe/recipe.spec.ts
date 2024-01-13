import { RecipeEntity } from './recipe.entity';

describe('Recipe', () => {
  it('should be defined', () => {
    expect(new RecipeEntity()).toBeDefined();
  });
});
