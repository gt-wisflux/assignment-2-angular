import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('all')
  getAllIngredients() {
    return this.ingredientService.getAllIngredients();
  }
}
