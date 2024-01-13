import { Ingredient } from './ingredient.entity';

describe('Ingredient', () => {
  it('should be defined', () => {
    expect(new Ingredient()).toBeDefined();
  });
});
