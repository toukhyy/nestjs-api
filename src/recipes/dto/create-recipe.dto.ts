import { IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  ingredients: string[];
}
