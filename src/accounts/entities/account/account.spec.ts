import { AccountEntity } from './account.entity';

describe('Account', () => {
  it('should be defined', () => {
    expect(new AccountEntity()).toBeDefined();
  });
});
