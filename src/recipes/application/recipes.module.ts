import { Module } from '@nestjs/common';
import { RecipesController } from '../presenters/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesRepository } from './ports/recipes.repository';
import { OrmRecipesRepository } from '../infrastructure/adapters/orm-recipes.repository';
import { RecipeEntity } from '../infrastructure/entities/recipe.entity';

@Module({
  controllers: [RecipesController],
  providers: [
    RecipesService,
    {
      provide: RecipesRepository,
      useClass: OrmRecipesRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  exports: [RecipesService],
})
export class RecipesModule {}
