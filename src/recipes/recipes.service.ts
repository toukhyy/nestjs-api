import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: 'abc',
      title: 'Recipe 1',
      description: 'Description 1',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
    },
    {
      id: 'def',
      title: 'Recipe 2',
      description: 'Description 2',
      ingredients: ['Ingredient 3', 'Ingredient 4'],
    },
  ];

  findAll() {
    return this.recipes;
  }

  findOne(id: string) {
    const recipe = this.recipes.find((recipe) => recipe.id === id);

    if (!recipe) {
      throw new NotFoundException(`Recipe with id "${id}" not found`);
      // throw new HttpException(
      //   `Recipe with id "${id}" not found`,
      //   HttpStatus.NOT_FOUND,
      // );
    }
    return recipe;
  }

  create(createRecipeDto: CreateRecipeDto) {
    const recipe = {
      id: crypto.randomUUID(),
      ...createRecipeDto,
    };
    this.recipes.push(recipe);
    return recipe;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const existingRecipe = this.findOne(id);

    if (existingRecipe) {
      console.log({ updateRecipeDto });
    }
  }

  remove(id: string) {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex >= 0) {
      this.recipes.splice(recipeIndex, 1);
    }
  }
}
