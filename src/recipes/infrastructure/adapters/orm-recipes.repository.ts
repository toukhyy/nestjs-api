import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesRepository } from 'src/recipes/application/ports/recipes.repository';
import { Recipe } from 'src/recipes/domain/models/recipe.model';
import { Repository } from 'typeorm';
import { RecipeEntity } from '../entities/recipe.entity';

@Injectable()
export class OrmRecipesRepository implements RecipesRepository {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipesRepository: Repository<RecipeEntity>,
  ) {}

  findAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<Recipe[]> {
    return this.recipesRepository.find({
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });
  }

  findOne(id: string): Promise<Recipe | null> {
    return this.recipesRepository.findOne({
      where: { id },
    });
  }
}
