import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredients.entity';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
  exports: [RecipesService],
})
export class RecipesModule {}
