import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Ingredient } from './ingredients.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes, {
    cascade: true,
  })
  ingredients: Ingredient[];
}
