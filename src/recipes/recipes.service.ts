import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredients.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto.ts/pagination-query.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return await this.recipesRepository.find({
      relations: ['ingredients'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe #${id} not found`);
    }

    return recipe;
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const ingredients = await Promise.all(
      createRecipeDto.ingredients.map((name) =>
        this.preloadIngredientByName(name),
      ),
    );

    const recipe = this.recipesRepository.create({
      ...createRecipeDto,
      ingredients,
    });

    return await this.recipesRepository.save(recipe);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const ingredients =
      updateRecipeDto.ingredients &&
      (await Promise.all(
        updateRecipeDto?.ingredients?.map((name) =>
          this.preloadIngredientByName(name),
        ),
      ));

    const recipe = await this.recipesRepository.preload({
      id,
      ...updateRecipeDto,
      ingredients,
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe #${id} not found`);
    }

    return await this.recipesRepository.save(recipe);
  }

  async remove(id: string) {
    const recipe = await this.findOne(id);

    return await this.recipesRepository.remove(recipe);
  }

  private async preloadIngredientByName(name: string) {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { name },
    });

    if (ingredient) return ingredient;

    return this.ingredientsRepository.create({ name });
  }
}
