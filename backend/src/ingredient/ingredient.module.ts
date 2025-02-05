import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';

@Module({
  imports: [SequelizeModule.forFeature([Ingredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
