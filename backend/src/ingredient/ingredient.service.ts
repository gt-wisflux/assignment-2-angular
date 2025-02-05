import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient) private readonly ingredientModel: typeof Ingredient,
  ) {}
  
  getAllIngredients() {
    return this.ingredientModel.findAll(); 
  }
}
