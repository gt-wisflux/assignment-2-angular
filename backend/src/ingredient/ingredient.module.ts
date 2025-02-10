import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';
import { ItemIngredient } from 'src/link_tables/itemIngredient.model';

@Module({
  imports: [SequelizeModule.forFeature([Ingredient, ItemIngredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
