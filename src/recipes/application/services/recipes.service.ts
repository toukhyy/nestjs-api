import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/models/recipe.model';
import { RecipesRepository } from '../ports/recipes.repository';

@Injectable()
export class RecipesService {
  constructor(private recipesRepository: RecipesRepository) {}

  async findAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<Recipe[]> {
    return this.recipesRepository.findAll(paginationQuery);
  }

  async findOne(id: string): Promise<Recipe | null> {
    return this.recipesRepository.findOne(id);
  }
}
