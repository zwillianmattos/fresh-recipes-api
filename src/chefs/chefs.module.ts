import { Module } from '@nestjs/common';
import { ChefsController } from './chefs.controller';
import { ChefsService } from './chefs.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/accounts/entities/account/account.entity';
import { ChefEntity } from './entities/chef/chef.entity';
import { JwtStrategy } from 'src/accounts/jwt.strategy';
import { RecipeEntity } from 'src/recipes/entities/recipe/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, ChefEntity, RecipeEntity]),
  ],
  controllers: [ChefsController],
  providers: [JwtStrategy, AccountsService, ChefsService,],
  exports: [ChefsService]
})
export class ChefsModule { }
