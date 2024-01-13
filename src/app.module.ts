import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { CommentsModule } from './comments/comments.module';
import { ChefsModule } from './chefs/chefs.module';
import { PhotosModule } from './photos/photos.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.API_SECRET,
      global: true,
    }),
    TypeOrmModule.forRoot(mysql({
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })),
    AccountsModule,
    ChefsModule,
    PhotosModule,
    RecipesModule,
    CommentsModule,
    IngredientsModule,
  ],
  exports: [PassportModule, JwtModule, TypeOrmModule]
})
export class AppModule { }

function sqlite(opt) {
  return {
    ...opt,
    type: 'sqlite',
    database: 'freshrecipes.db',
  }
}
function mysql(opt) {
  return {
    ...opt,
    type: 'mysql',
    host: 'localhost',
    port: 3388,
    username: 'root',
    password: 'root',
    database: 'freshrecipes',
  }
}