import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from '../application/services/recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  findAll(@Query() paginationQueryDto: { limit: number; offset: number }) {
    return this.recipesService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
}
