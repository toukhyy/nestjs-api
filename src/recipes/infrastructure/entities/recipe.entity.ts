import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;
}
