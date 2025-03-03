import { Recipe } from 'src/recipes/domain/models/recipe.model';

export abstract class RecipesRepository {
  abstract findAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<Recipe[]>;

  abstract findOne(id: string): Promise<Recipe | null>;
}
