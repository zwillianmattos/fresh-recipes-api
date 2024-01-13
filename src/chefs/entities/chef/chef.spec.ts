import { ChefEntity } from './chef.entity';

describe('Chef', () => {
  it('should be defined', () => {
    expect(new ChefEntity()).toBeDefined();
  });
});
